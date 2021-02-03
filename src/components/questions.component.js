import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

function Questions() {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    let params = useParams()

    let onSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: username,
            password: password,
            firstName: firstName,
            emailAddress: emailAddress
        }

        console.log(user)
        
        axios.post('http://localhost:5000/users/updateaccount/'+params.id, user)
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
        axios.delete('http://localhost:5000/users/'+params.id)
            .then(res => {
                console.log(res.data)
                window.location = '/'
            })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/users/'+params.id)
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
                <label>Would you kick a puppy?
                    <input type="range" id="volume" name="volume"min="0" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>Some other question?
                    <input type="range" id="volume" name="volume"min="0" max="5"></input>
                </label>
                <br/>
                <br/>
                <label>Yeah?
                    <input type="range" id="volume" name="volume"min="0" max="5"></input>
                </label>
                <br/>
                <br/>
                <button type="submit">Generate Music Preference</button>
            </form>
        </div>
    )
}

export default Questions;