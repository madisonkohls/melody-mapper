import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import {Button} from 'reactstrap'
import '../App.css';
import happy from '../assets/happy.png';
import neutral from '../assets/neutral.png';
import sad from '../assets/sad.png';

function Mood() {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ genre, setMusicGenre ] = useState("")
    let params = useParams()

    useEffect(() => {
        axios.get('http://localhost:8000/users/'+params.id)
            .then(response => {
                const user = response.data
                setUsername(user.username)
                setFirstName(user.firstName)
                setEmailAddress(user.emailAddress)
                setPassword(user.password)
                setMusicGenre(user.musicGenre)
            })
            .catch(function(error){
                console.log(error)
            })
    }, [])

    let onHomePage = (event) => {
        event.preventDefault();
        console.log("Home Page")
        window.location = '/'
    }

    let onMoodClick1 = (event) => {
        event.preventDefault();
        updateAccount("good");
    }

    let onMoodClick2 = (event) => {
        event.preventDefault();
        updateAccount("neutral");
    }

    let onMoodClick3 = (event) => {
        event.preventDefault();
        updateAccount("bad");
    }

    let updateAccount = (mood) => {
        const user = {
            username: username,
            password: password,
            firstName: firstName,
            emailAddress: emailAddress,
            musicGenre: genre,
            mood: mood

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

    return (
      <div>
        <div class = "mainpage">
            <div class = "logoutbutton">
            <Button style={{backgroundColor:"#4B7268"}} onClick={onHomePage}>Log out</Button>
            </div>
            <div class = "topsection">
            <h2 class="titleText">hey {firstName}!</h2>
            <p>how are you feeling today?</p>
            </div>
            <div class = "moodholder">
            <button style={{backgroundColor:"#FFFFFF", border:"none"}} onClick={onMoodClick1}><img id="mood" src={happy} alt="good"/></button>
            <button style={{backgroundColor:"#FFFFFF", border:"none"}} onClick={onMoodClick2}><img id="mood" src={neutral} alt="neutral"/></button>
            <button style={{backgroundColor:"#FFFFFF", border:"none"}} onClick={onMoodClick3}><img id="mood" src={sad} alt="bad"/></button>
            </div>
        </div>
      </div>

    )
}

export default Mood;
