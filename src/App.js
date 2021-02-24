import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Main from "./components/main.component"
import CreateAccount from "./components/create-account.component"
import Questions from "./components/questions.component"
import Profile from "./components/profile.component"
import Mood from "./components/mood.component"
import './App.css';



function App() {
  return (
    <Router>
      <div className="WebApp">
        <Route path="/" exact component={Main} />
        <Route path="/create-account/" component={CreateAccount} />
        <Route path="/questions/:id" component={Questions} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/mood/:id" component={Mood} />
      </div>
    </Router>
  );
}

export default App;
