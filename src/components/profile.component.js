import React, { useEffect, useState } from "react"

function Profile() {
    let onHomePage = (event) => {
        event.preventDefault();
        console.log("Login Page")
        window.location = '/'
    }

    return (
        <div>
            <h3>Music w Journal</h3>
            <button onClick={onHomePage}>Log out</button>
        </div>
    )
}

export default Profile;