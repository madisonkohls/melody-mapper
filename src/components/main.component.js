import React, { useState } from "react"
import axios from 'axios'
import clipart from '../assets/loginPage.svg';
import {Button} from 'reactstrap'

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
        axios.post('http://localhost:8000/users/login', user)
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
        <div class="mainpage">
            <div class="clipart-container">
              <img id="clipart" src={clipart} alt="People listening to music" />
            </div>

            <div class="titleText">
            <h1>melody mapper</h1>
            </div>
            <div>
              <form class = "loginForm" onSubmit={onSubmit}>
              <div>
              <label class="formfield">Username: </label>
                  <input type="text"
                      name="username"
                      value={username}
                      onChange={event => setUsername(event.target.value)}
                      placeholder="ex: eggyboy"
                      required
                  />
              </div>
              <div>
                  <label class="formfield">Password: </label>
                  <input type="password"
                      name="password"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      placeholder="ex: p@ssw0rd"
                      required
                  />
              </div>
              <div>
                  <Button style={{backgroundColor:"#4B7268", margin: "5%"}} type="submit">Login</Button>
              </div>
              </form>
            </div>
            <br />
            <Button onClick={onRegister}>Create an Account</Button>
        </div>
    )
}

export default Main;
