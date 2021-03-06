import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import Journal from "./journal"
import {Button} from 'reactstrap'
import '../App.css';

// [0] is good, [8] is bad
let playlists = [
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX4uPi2roRUwU",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWSf2RDTDayIx",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXaXB8fQg7xif",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWZQaaqNMbbXa",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX802IXCAaWtY",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX8a1tdzq5tbM",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX6Z0nWFAx7KL",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWVrtsSlLKzro"
  ], //dance
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX5mB2C8gBeUM",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX5OrO2Jxuvdn",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX13ZzXoot6Jc",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXdxUH6sNtcDe",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX9hWdQ46pHPo",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXepGEFFmQXJ",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXdfhOsjRMISB",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXi7h4mmmkzD",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXamBAn43YNB9",
  ], // country
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX5Lm1ZiObdc3",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX4s3V2rTswzO",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX2aCk0vzzaZQ",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWUajed02NzWR",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX9OZisIoJQhG",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX7cBprxbt1Fn",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX0Aaer4Jzfgm",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXbm0dp7JzNeL",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWVFeEut75IAL"
  ], // classical music
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWVlYsZJXqdym",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX8ttEdg9VJHO",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXti3N4Wp5xy",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX92MLsP3K1fI",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXcOFePJj4Rgb",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXbIGqYf7WDxP",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWTwnEm1IYyoj",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWX3xqQKu0Sgn",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWYp3yzk1civi"
  ], // pop
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX8FwnYE6PRvL",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWYE5MI4mMuii",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWWJOmJ7nRx0C",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWWRktbhJiuqL",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX2aneNMeYHQ8",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWYctfAtweUtE",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXs1L3AC0Xio",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX6xOPeSOGone"
  ], // rock
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWUFmyho2wkQU",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWU4xkXueiKGW",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX76t638V6CA8",
    "https://open.spotify.com/embed/playlist/38iI10NJQ5HY0ilCItMz5r",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWTIuAboZgTMf",
    "https://open.spotify.com/embed/playlist/5772HGqmp2E99GQo5tfmcJ",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWY4xHQp97fN6",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWT6MhXz0jw61",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX2y6end4Tb8T"
  ], // rap
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX10zKzsJ2jva",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWUPj9VuIP3Gq",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWUPj9VuIP3Gq",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXbLMw3ry7d7k",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX1QnNyJOBQBv",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWVIKVPO4xOlK",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWZufbpO1g3tw",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWYzTSrc7SiSZ",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXdqxfWN3raU3"
  ] // latin radio
];

const genreNum = {
  DANCE: "Dance",
  COUNTRY: "Country",
  CLASSICAL: "Classical music",
  POP: "Pop",
  ROCK: "Rock",
  RAP: "Hiphop, Rap",
  LATIN: "Latino"
}

function Profile() {
    const [ username, setUsername ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ musicGenre, setMusicGenre ] = useState(0)
    const [ mood, setMood ] = useState("")
    const [ moodlist, setMoodlist ] = useState("")
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
       let i = 4
       let genre = 3
       let tempMood = mood
       console.log(tempMood)
       switch(tempMood) {
         case "good":
          i = Math.floor(Math.random() * 4)
          break
         case "bad":
          i = Math.floor(Math.random() * 4 + 5)
          break
         case "neutral":
          i = Math.floor(Math.random() * 4 + 3)
          break
       }
       switch(musicGenre) {
         case genreNum.DANCE:
          genre = 0
          break
         case genreNum.COUNTRY:
          genre = 1;
          break
         case genreNum.CLASSICAL:
          genre = 2
          break
         case genreNum.POP:
          break
         case genreNum.ROCK:
          genre = 4
          break
         case genreNum.RAP:
          genre = 5
          break
         case genreNum.LATIN:
          genre = 6
          break
       }
       let playlist = playlists[genre][i]
       setMoodlist(playlist)
    });

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
            <iframe src={moodlist} width="500px" height="100px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            </div>
        </div>
        <Journal userID={params.id} mood={mood} />
      </div>
    )
}

export default Profile;
