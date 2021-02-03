import React, { useState } from "react"
import axios from 'axios'

function Main(){
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    let onSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: username,
            password: password,
        }
        console.log(user)
        axios.post('http://localhost:5000/users/login', user)
            .then(res => onLogin(res))
            .catch(error => handleErrorLogin(error))
    }

    let handleErrorLogin = (error) => {
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

    let onLogin = (res) => {
        console.log(res)
        console.log('Successful login for '+res.data.user.username)
        window.location = '/profile/'+res.data.user._id
    }

    let onRegister = (event) => {
        event.preventDefault();
        console.log("Registration")
        window.location = '/create-account/'
    }

    return(
        <div>
            <h1>Welcome to Melody Tracker!</h1>
            <br />
            <img src="https://previews.123rf.com/images/sebra/sebra1507/sebra150700122/43575050-listening-music.jpg" width="300" height="200" alt="music pic here" />
            <br />
            <form onSubmit={onSubmit}>
            <label>Username: </label>
                <input type="text"
                    name="username" 
                    value={username} 
                    onChange={event => setUsername(event.target.value)} 
                    placeholder="ex: eggyboy" 
                    required
                />
                <br />
                <label>Password: </label>
                <input type="password"
                    name="password" 
                    value={password}
                    onChange={event => setPassword(event.target.value)} 
                    placeholder="ex: p@ssw0rd"
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <br />
            <button onClick={onRegister}>Create an Account</button>
        </div>
    )
}

export default Main;