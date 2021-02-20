import React, { useState } from "react"
import axios from 'axios'
import {Button} from 'reactstrap'

function CreateAccount() {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ firstName, setFirstName ] = useState("")

    let onSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: username,
            password: password,
            firstName: firstName,
            emailAddress: emailAddress
        }

        console.log(user)

        axios.post('http://localhost:8000/users/createaccount', user)
            .then(res => handleRegister(res))
            .catch(error => handleErrorRegister(error))
    }

    let handleRegister = (res) => {
        console.log(res)
        console.log('Successful Account created for '+res.data.user.username)
        window.location = '/questions/'+res.data.user._id
    }

    let handleErrorRegister = (error) => {
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

    let onHomePage = (event) => {
        event.preventDefault();
        console.log("Home Page")
        window.location = '/'
    }

    return(
        <div class="mainpage">

            <h3 class="titleText topsection">Create New Account</h3>

            <form class="loginForm" onSubmit={onSubmit}>
                <label> Name:
                <input class="formfield"
                    name="firstName"
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                    placeholder="ex: John"
                />
                </label>
                <label>Username:
                <input class="formfield"
                    name="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    placeholder="ex: johndoe"
                />
                </label>

                <label>Email Address:
                <input class="formfield"
                    name="emailAddress"
                    value={emailAddress}
                    onChange={event => setEmailAddress(event.target.value)}
                    placeholder="ex: johndoe@aol.com"
                />
                </label>

                <label>Password:
                <input class="formfield"
                    type="password"
                    name="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder="ex: password123"
                />
                </label>

                <Button style={{backgroundColor:"#4B7268", margin: "5%"}} type="submit">Create Account</Button>
                <Button onClick={onHomePage}>Already have an account? Log In</Button>

            </form>
        </div>
    )
}

export default CreateAccount;
