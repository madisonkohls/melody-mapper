import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import {Button} from 'reactstrap'
import '../App.css';

function Mood() {
    const [ username, setUsername ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ musicGenre, setMusicGenre ] = useState(0)
    let params = useParams()

    useEffect(() => {
        axios.get('http://localhost:8000/users/'+params.id)
            .then(response => {
                const user = response.data
                setUsername(user.username)
                setFirstName(user.firstName)
                setEmailAddress(user.emailAddress)
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

    return (
      <div>
        <div class = "mainpage">
            <div class = "logoutbutton">
            <Button style={{backgroundColor:"#4B7268"}} onClick={onHomePage}>Log out</Button>
            </div>
            <div class = "topsection">
            <h2 class="titleText">hey {firstName}!</h2>
            <p>How are you feeling today?</p>
            </div>
            <div class = "moodbutton">
            <Button style={{backgroundColor:"#CCFFCC"}} onClick={onHomePage}>Good :)</Button>
            </div>
            <div class = "moodbutton">
            <Button style={{backgroundColor:"#FFFFCC"}} onClick={onHomePage}>Neutral :/</Button>
            </div>
            <div class = "moodbutton">
            <Button style={{backgroundColor:"#FF9999"}} onClick={onHomePage}>Bad :(</Button>
            </div>
        </div>
      </div>

    )
}

export default Mood;
