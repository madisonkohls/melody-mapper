import React, { useState } from "react"
import axios from 'axios'

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
        
        axios.post('http://localhost:5000/users/createaccount', user)
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
        <div>
            <h3>Create New Account</h3>
            <button onClick={onHomePage}>Already have an account? Log In</button>
            <br />
            <br />
            <form onSubmit={onSubmit}>
                <label>Username:
                <input
                    name="username" 
                    value={username} 
                    onChange={event => setUsername(event.target.value)} 
                    placeholder="ex: johndoe" 
                />
                </label>

                <label> Name:
                <input 
                    name="firstName" 
                    value={firstName} 
                    onChange={event => setFirstName(event.target.value)} 
                    placeholder="ex: John" 
                />
                </label>
                <br />
                <br />

                <label>Email Address:
                <input
                    name="emailAddress" 
                    value={emailAddress}
                    onChange={event => setEmailAddress(event.target.value)} 
                    placeholder="ex: johndoe@aol.com" 
                />
                </label>
                <br /> 
                <br />

                <label>Password:
                <input type="password"
                    name="password" 
                    value={password} 
                    onChange={event => setPassword(event.target.value)} 
                    placeholder="ex: password123" 
                />
                </label>
                <br />
                <br />
                
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default CreateAccount;