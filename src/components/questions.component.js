import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

function Questions() {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ responses, setResponses ] = useState([3,3,3,3,3,3,3,3,3,3])
    let params = useParams()

    let changeResponses = (index, value) => {
        let newResponses = [...responses];
        newResponses[index] = parseInt(value);
        setResponses(newResponses)
        console.log(newResponses)
    }

    async function onSubmit (event) {
        event.preventDefault();
        //predict music genre
        const data = {
            inputdata: responses
        }
        let genre = 0;
        try {
            genre = await axios.post('http://localhost:5000/predict', data);
            console.log(genre)
        } catch (error) {
            handleErrorEdit(error);
        } finally {
            updateAccount(genre.data);
        }
    }

    let updateAccount = (genre) => {
        const user = {
            username: username,
            password: password,
            firstName: firstName,
            emailAddress: emailAddress,
            musicGenre: genre
        }

        console.log(user)
        
        axios.post('http://localhost:8000/users/updateaccount/'+params.id, user)
            .then(res => handleSuccess(res))
            .catch(error => handleErrorEdit(error))
    }

    let handleSuccess = (res) => {
        console.log(res)
        console.log('Successful Response')
        window.location = '/profile/'+res.data.user._id
    }

    let handleErrorEdit = (error) => {
        let errorMessage
        if(error.response && error.response.data) {
            //Error Responses
            if(error.response.data.type){
                errorMessage = error.response.data.type
            }
            else {
                errorMessage = error.response.data
            }
        } else if(error.request) {
            // Network failures, etc.
            errorMessage = error.request.message || error.request.statusText;
        } else {
            //Other errors
            errorMessage= error.message
        }
        console.log(errorMessage)
        alert(errorMessage)
    }

    let deleteAccount = () => {
        axios.delete('http://localhost:8000/users/'+params.id)
            .then(res => {
                console.log(res.data)
                window.location = '/'
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/users/'+params.id)
            .then(response => {
                const user = response.data
                setUsername(user.username)
                setFirstName(user.firstName)
                setEmailAddress(user.emailAddress)
                setPassword(user.password)
            })
            .catch(function(error){
                console.log(error)
            })
    }, [])

    return (
        <div>
            <h3>Welcome {firstName}</h3>
            <h4>Before you join us, we'll need you to just answer a few question</h4>
            <button onClick={deleteAccount}>What? No way!</button>
            <br/>
            <br/>
            <form onSubmit={onSubmit}>
                <label>I enjoy horror movies: 
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[0]}
                        onChange={event => changeResponses(0, event.target.value)} 
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>I enjoy romanctic movies:
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[1]}
                        onChange={event => changeResponses(1, event.target.value)} 
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>I enjoy action movies:
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[2]}
                        onChange={event => changeResponses(2, event.target.value)}
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>I enjoy learning about history: 
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[3]}
                        onChange={event => changeResponses(3, event.target.value)}
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>I enjoy playing musical instruments: 
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[4]}
                        onChange={event => changeResponses(4, event.target.value)}
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>I enjoy learning about science and technology: 
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[5]}
                        onChange={event => changeResponses(5, event.target.value)}
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>I enjoy socializing: 
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[6]}
                        onChange={event => changeResponses(6, event.target.value)}
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>I enjoy extreme sports: 
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[7]}
                        onChange={event => changeResponses(7, event.target.value)}
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>I am very patient: 
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[8]}
                        onChange={event => changeResponses(8, event.target.value)}
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>If I find something the doesn't belong to me I will hand it in: 
                    <input 
                        type="range" 
                        id="fader" 
                        value={responses[9]}
                        onChange={event => changeResponses(9, event.target.value)}
                        min="1" max="5"></input>
                </label>
                <br/>
                <br/>
                <button type="submit">Generate Music Preference</button>
            </form>
        </div>
    )
}

export default Questions;