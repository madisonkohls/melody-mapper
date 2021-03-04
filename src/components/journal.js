import React, { Component } from "react"
import Entries from "./entries"
import Form from "./form"
import SearchField from "react-search-field";

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

      this.setState({
        currTitle: title,
        currBody: body,
        addEdit: "edit an",
        entries: entries.filter ((entry, i) => {
          return i != index
        })
      })
    }
/*

*/
  handleSubmit = entry => {

    this.setState({
      entries: [...this.state.entries, entry],
      addEdit: "add a new",
    })
  }
  handleSearchInputChange = entry => {
    //do the search
    //this.setState({ entries: //search results
  }

  render() {
    const { entries } = this.state;
    return (
      <div class = "journal">
        <div class = "journalelement">
        <h2 class = "titleText"> {this.state.addEdit} entry </h2>
        <Form handleSubmit={this.handleSubmit} userid={this.userID} title={this.state.currTitle} body = {this.state.currBody} />

        <div class = "spotify">
        <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX92MLsP3K1fI" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
        </div>
        <div class = "journalelement">
          <div class = "searchcontainer">
              <SearchField
                placeholder="search entries by title"
                onChange={this.handleSearchInputChange}
                searchText=""
                classNames="searchbar"
                />
            </div>
            <Entries entryData={entries} removeEntry={this.removeEntry} editEntry={this.editEntry}/>
        </div>
      </div>
    )
  }

}
export default Journal;
