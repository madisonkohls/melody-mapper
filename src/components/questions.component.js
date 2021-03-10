import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import {Button} from 'reactstrap'

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
        window.location = '/mood/'+res.data.user._id
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

        <div class="mainpage">
            <h3 class="toppadding titleText">hi {firstName}, welcome to melody mapper!</h3>
            <h6 class="titleText" style={{fontStyle: "italic", width:"50%"}}>before you join us, we'll need you to rank the following statements from 1 (strongly disagree) to 5 (strongly agree).</h6>
            <Button style={{backgroundColor:"#4B7268", margin: "2%"}} onClick={deleteAccount}>what? no way!</Button>

            <br/>
            <br/>
            <form class="loginForm" onSubmit={onSubmit}>
                <div class="formelement">
                    <label>I enjoy Sci-fi movies:</label>
                    <br/>
                    <input
                    type="range"
                    id="fader"
                    value={responses[0]}
                    onChange={event => changeResponses(0, event.target.value)}
                    min="1" max="5" />
                    <span class="currvalue">({responses[0]}/5)</span>
                </div>
                <div class="formelement">
                    <label>I enjoy reading poetry:  </label>
                        <br/>
                        <input class="formfield"
                        type="range"
                        id="fader"
                        value={responses[1]}
                        onChange={event => changeResponses(1, event.target.value)}
                        min="1" max="5" />
                        <span class="currvalue" >({responses[1]}/5)</span>
                </div>
                <div class="formelement">
                <label>I am interested in cars: </label>
                    <br />
                    <input class="formfield"
                        type="range"
                        id="fader"
                        value={responses[2]}
                        onChange={event => changeResponses(2, event.target.value)}
                        min="1" max="5"/>
                        <span class="currvalue">({responses[2]}/5)</span>
                </div>
                <div class="formelement">
                <label>I enjoy dancing:</label>
                <br />
                    <input class="formfield"
                        type="range"
                        id="fader"
                        value={responses[3]}
                        onChange={event => changeResponses(3, event.target.value)}
                        min="1" max="5"/>
                        <span class="currvalue">({responses[3]}/5)</span>

                </div>
                <div class="formelement">
                <label>I enjoy following celebrity lifestyles:</label>
                <br />
                    <input class="formfield"
                        type="range"
                        id="fader"
                        value={responses[4]}
                        onChange={event => changeResponses(4, event.target.value)}
                        min="1" max="5"/>
                        <span class="currvalue">({responses[4]}/5)</span>
                </div>
                <div class="formelement">
                <label>I am interested in theatre:</label>
                <br />
                    <input class="formfield"
                        type="range"
                        id="fader"
                        value={responses[5]}
                        onChange={event => changeResponses(5, event.target.value)}
                        min="1" max="5"/>
                        <span class="currvalue">({responses[5]}/5)</span>
                </div>
                <div class="formelement">
                <label>I am afraid of spiders:</label>
                <br />
                    <input class="formfield"
                        type="range"
                        id="fader"
                        value={responses[6]}
                        onChange={event => changeResponses(6, event.target.value)}
                        min="1" max="5"/>
                        <span class="currvalue">({responses[6]}/5)</span>
                </div>
                <div class="formelement">
                <label>I always make a list so I do not forget anything:</label>
                <br />
                    <input class="formfield"
                        type="range"
                        id="fader"
                        value={responses[7]}
                        onChange={event => changeResponses(7, event.target.value)}
                        min="1" max="5"/>
                        <span class="currvalue">({responses[7]}/5)</span>
                </div>
                <div class="formelement">
                <label>I believe in God:</label>
                <br />
                    <input class="formfield"
                        type="range"
                        id="fader"
                        value={responses[8]}
                        onChange={event => changeResponses(8, event.target.value)}
                        min="1" max="5" />
                        <span class="currvalue">({responses[8]}/5)</span>
                </div>
                <div class="formelement">
                <label>I always make sure I connect with the right people:</label>
                <br />
                    <input class="formfield"
                        type="range"
                        id="fader"
                        value={responses[9]}
                        onChange={event => changeResponses(9, event.target.value)}
                        min="1" max="5"/>
                        <span class="currvalue">({responses[9]}/5)</span>
                </div>
                <Button type="submit" style={{backgroundColor:"#4B7268", margin: "2%"}}>Generate Music Preference</Button>
            </form>
        </div>
    )
}

export default Questions;
