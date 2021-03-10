import React, { Component } from "react"
import Entries from "./entries"
import Form from "./form"
import {Button, FormGroup, Input, Label} from 'reactstrap'
import axios from 'axios'


class Journal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries:[
      ],
      currTitle: "",
      currBody: "",
      addEdit: "add a new",
      searchContents: '',
      arrowValue: "next-button",
      todaysEntries:[],
      isSearching: false,
      todayOrResults: "today's entries"
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
    const tobeRemoved = entries[index];
    this.setState({
      entries: entries.filter ((entry, i) => {
        return i != index
      })
    })

    axios.post('http://localhost:8000/journals/delete',
    {id:this.props.userID, title:tobeRemoved.title, text:tobeRemoved.body})
     .then((results) => {
       console.log(results.data);
      });
  }

  editEntry = (index, title, text) => {
      const { entries } = this.state
      if (this.state.currTitle != "" || this.state.currBody != "") {
        alert("You're already editing an entry! Submit to save your work or clear to discard it.");
      }

      else {
        this.setState({
          currTitle: title,
          currBody: text,
          addEdit: "edit an",
          entries: entries.filter ((entry, i) => {
              return i != index
            })
          })
      }
  }

  handleSubmit = entry => {
    this.setState({
      entries: [entry, ...this.state.entries],
      addEdit: "add a new",
      currTitle: "",
      currBody: "",
    })
  }

  handleClearSearch = () => {
    this.setState({
      entries: this.state.todaysEntries,
      isSearching: false,
      searchContents:"",
      todayOrResults: "today's entries",
    })
  }

  handleSearch = (searchInp) => {
    if (searchInp == "") return;
    if (!this.state.isSearching) {
      this.setState({todaysEntries: this.state.entries})
    }
    this.setState({
      entries:[],
      todayOrResults: "search results",
      isSearching: true,
    })
    //do the search for this.state.searchContents
    //this.setState({ entries: //search results
    //it's currently set up so the search will happen whenever the search field input changes
    //or the user presses the "Search" button
    console.log('search');
    console.log(this.props.userID);
    //return as array of journal
    var i;
    axios.post('http://localhost:8000/journals/search-journals',
    {query:searchInp, userCheck:this.props.userID})
    .then(results => {
       for(i = 0; i < results.data.length; i++)
       {
         this.handleSubmit(results.data[i]);
       }
       console.log(results);
      });
  }

  handleChange = event => {
    const{name, value} = event.target
    this.setState({
      [name]: value})
     }
  setArrow = () => {
   if (this.state.arrowValue == "next-button") {
     window.location="#journalTag"
     this.setState({arrowValue: "prev-button"})
   }
   else {
     window.location="#top"
     this.setState({arrowValue: "next-button"})
   }
 }

  render() {
    const { entries } = this.state;
    return (
      <div>
        <div class={this.state.arrowValue} onClick={this.setArrow}></div>
        <div class = "journal">
          <div class = "journalelement">
            <h2 class = "titleText"> {this.state.addEdit} entry </h2>
            <Form handleSubmit={this.handleSubmit} clearForm={this.clearForm} userid={this.props.userID} mood = {this.props.mood} title={this.state.currTitle} body = {this.state.currBody}/>
          </div>
          <div class = "journalelement">
           <h2 class = "titleText"> search all entries </h2>
            <div class = "searchcontainer">
                <div class = "searchelement">
                  <Input
                    placeholder="Search entries by title."
                    className="searchbar"
                    value = {this.state.searchContents}
                    name = 'searchContents'
                    onChange={this.handleChange}
                    />
                </div>
                <div class = "searchelement">
                  <Button style={{backgroundColor:"#4B7268"}} onClick={() => this.handleSearch(this.state.searchContents)} >Search</Button>
                </div>
                <div class = "searchelement">
                  <Button style={{backgroundColor:"#6c757d"}} onClick={() => this.handleClearSearch()} >Clear</Button>
                </div>
            </div>
            <h2 class="titleText"> {this.state.todayOrResults} </h2>
            <Entries entryData={entries} removeEntry={this.removeEntry} editEntry={this.editEntry}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Journal;
