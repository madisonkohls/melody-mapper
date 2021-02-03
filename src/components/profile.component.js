import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

function Profile() {
    const [ username, setUsername ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    let params = useParams()

    useEffect(() => {
        axios.get('http://localhost:5000/users/'+params.id)
            .then(response => {
                const user = response.data
                setUsername(user.username)
                setFirstName(user.firstName)
                setEmailAddress(user.emailAddress)
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
            <h3>Hello {firstName}!</h3>
            <button onClick={onHomePage}>Log out</button>
        </div>
    )
}

export default Profile;