import React, { Component } from "react"
import Entries from "./entries"
import Form from "./form"

class Journal extends Component {
  state = {
    entries:[
    ]
  }
  removeEntry = index => {
    const { entries } = this.state

    this.setState({
      entries: entries.filter ((entry, i) => {
        return i != index
      })
    })
  }
  handleSubmit = entry => {
    this.setState({ entries: [...this.state.entries, entry]})
  }

  render() {
    const { entries } = this.state;
    return (
      <div class = "journal">
        <div class = "journalelement">
        <h2 class = "titleText"> add a new entry </h2>
        <Form handleSubmit={this.handleSubmit}/>
        <div class = "spotify">
        <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX92MLsP3K1fI" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
        </div>
        <div class = "journalelement">
        <Entries entryData={entries} removeEntry={this.removeEntry}/>
        </div>
      </div>
    )
  }

}
export default Journal;
