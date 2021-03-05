import React, { Component } from "react"
import Entries from "./entries"
import Form from "./form"
import {Button, FormGroup, Input, Label} from 'reactstrap'


//import axios from 'axios'

class Journal extends Component {
  userID = this.props.userID;
  constructor(props) {
    super(props)
    this.state = {
      entries:[
      ],
      currTitle: "",
      currBody: "",
      addEdit: "add a new",
    }
  }
  clearForm = () => {
    this.setState ({
      currTitle: "",
      currBody: "",
    })
  }
  removeEntry = index => {
    const { entries } = this.state
    this.setState({
      entries: entries.filter ((entry, i) => {
        return i != index
      })
    })
  }

  editEntry = (index, title, body) => {
      const { entries } = this.state
      if (this.state.currTitle != "" || this.state.currBody != "") {
        alert("You're already editing an entry! Submit to save your work or clear to discard it.");
      }
      else {
        this.setState({
          currTitle: title,
          currBody: body,
          addEdit: "edit an",
          entries: entries.filter ((entry, i) => {
              return i != index
            })
          })
      }
  }
/*

*/
  handleSubmit = entry => {

    this.setState({
      entries: [...this.state.entries, entry],
      addEdit: "add a new",
      currTitle: "",
      currBody: "",
    })
  }
  handleSearchInputChange = () => {
    //do the search for this.state.searchContents
    //this.setState({ entries: //search results
    //it's currently set up so the search will happen whenever the search field input changes
    //or the user presses the "Search" button
  }


  render() {
    const { entries } = this.state;
    return (
      <div class = "journal">
        <div class = "journalelement">
          <h2 class = "titleText"> {this.state.addEdit} entry </h2>
          <Form handleSubmit={this.handleSubmit} clearForm={this.clearForm} userid={this.userID} title={this.state.currTitle} body = {this.state.currBody}/>
        </div>
        <div class = "journalelement">
         <h2 class = "titleText"> search all entries </h2>
          <div class = "searchcontainer">
              <div class = "searchelement">
                <Input
                  placeholder="Search entries by title."
                  onChange={this.handleSearchInputChange}
                  className="searchbar"
                  value = {this.state.searchContents}
                  />
              </div>
              <div class = "searchelement">
                <Button style={{backgroundColor:"#4B7268"}} onClick={this.handleSearchInputChange}>Search</Button>
              </div>
          </div>
          <Entries entryData={entries} removeEntry={this.removeEntry} editEntry={this.editEntry}/>
        </div>
      </div>
    )
  }

}
export default Journal;
