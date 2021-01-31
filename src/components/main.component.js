import React, { useState } from "react"

function Main(){
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    let onLogin = (event) => {
        event.preventDefault();
        window.location = '/profile/'
    }

    let onRegister = (event) => {
        event.preventDefault();
        window.location = '/create-account/'
    }

    return(
        <div>
            <h1>Welcome to Melody Tracker!</h1>
            <br />
            <img src="https://previews.123rf.com/images/sebra/sebra1507/sebra150700122/43575050-listening-music.jpg" width="300" height="200" alt="music pic here" />
            <br />
            <form onSubmit={onLogin}>
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