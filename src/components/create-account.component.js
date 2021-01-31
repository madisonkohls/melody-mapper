import React, { useState } from "react"

function CreateAccount() {

    let onHomePage = (event) => {
        event.preventDefault();
        console.log("Login Page")
        window.location = '/'
    }

    return(
        <div>
            <h3>Create New Account</h3>
            <button onClick={onHomePage}>Already have an account? Log In</button>
        </div>
    )
}

export default CreateAccount;