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
      <div className = "Journal">
        <h2> Add a New Entry </h2>
        <Form handleSubmit={this.handleSubmit}/>
        <Entries entryData={entries} removeEntry={this.removeEntry}/>
      </div>
    )
  }

}
export default Journal;
