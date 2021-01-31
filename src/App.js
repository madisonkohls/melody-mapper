import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Main from "./components/main.component"
import CreateAccount from "./components/create-account.component"
import Profile from "./components/profile.component"

function App() {
  return (
    <Router>
      <div className="WebApp">
        <Route path="/" exact component={Main} />
        <Route path="/create-account/" component={CreateAccount} />
        <Route path="/profile/" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
