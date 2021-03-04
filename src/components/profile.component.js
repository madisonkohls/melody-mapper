import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Journal from "./journal"
import {Button} from 'reactstrap'
import '../App.css';

function Profile() {
    const [ username, setUsername ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ musicGenre, setMusicGenre ] = useState(0)
    const [ mood, setMood ] = useState("")
    let params = useParams()

    useEffect(() => {
        axios.get('http://localhost:8000/users/'+params.id)
            .then(response => {
                const user = response.data
                setUsername(user.username)
                setFirstName(user.firstName)
                setEmailAddress(user.emailAddress)
                setMusicGenre(user.musicGenre)
                setMood(user.mood)
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
            <h6 class="subheader">your music genre is <em class="subheader-bold">{musicGenre}</em> and today you are feeling <em class="subheader-bold"> {mood} </em></h6>
            <h6 class="subheader"> we'd recommend listening to this playlist while you write: </h6>
            <div class = "spotify">
            <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX92MLsP3K1fI" width="500px" height="100px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            </div>
        </div>
        <Journal userID={params.id} />
      </div>

    )
}

export default Profile;
