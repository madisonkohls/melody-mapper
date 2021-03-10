import React, { Component } from "react"
import Entries from "./entries"
import Form from "./form"
import {Button, FormGroup, Input, Label} from 'reactstrap'
import axios from 'axios'
import happy from '../assets/happy.png';
import neutral from '../assets/neutral.png';
import sad from '../assets/sad.png';

function uniqByKeepLast(data, key){
  return [
      ...new Map(
        data.map(x => [key(x), x])
      ).values()
    ]
}

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
    axios.delete('http://localhost:8000/journals/delete',
    {data:{id:this.userID, title:tobeRemoved.title, text:tobeRemoved.text}})
     .then((results) => {
       console.log(results.data);
      });
  }

  editEntry = (index, title, body) => {
      const { entries } = this.state
      if (this.state.currTitle != "" || this.state.currBody != "") {
        alert("You're already editing an entry! Submit to save your work or clear to discard it.");
      }
      else {
        this.removeEntry(index)
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

  handleSubmit = entry => {
    this.setState({
      entries: uniqByKeepLast([entry, ...this.state.entries], it => it._id),
      addEdit: "add a new",
      currTitle: "",
      currBody: "",
    })
    console.log(this.state.entries)
  }

  handleClearSearch = () => {
    this.setState({
      entries: this.state.todaysEntries,
      isSearching: false,
      searchContents:"",
      todayOrResults: "today's entries",
    })
  }

  handleSearch = (searchInp,searchCat) => { //searchCat has to be  a passed in string "title" or "mood"
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
    //return as array of journal
    var i;
    axios.post('http://localhost:8000/journals/search-journals',
    {query:searchInp, searchType: searchCat}) //searchCat specifies if u are searching by mood or by title
    .then(results => {
      //only display result if it was made by your user id
       for(i = 0; i < results.data.length; i++)
       {
         if(results.data[i].userid == this.userID)
            this.handleSubmit(results.data[i]);
       }
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
                    <div class = "moodselect">
                      <div id="select-mood" class="mood-content" >
                        <div class="moodelem">
                          <h6 class="moodtext"> Filter entries by mood: </h6>
                        </div>
                        <div class="moodelem">
                          <label>
                            <input type="radio" value="good" name="mood" onChange={() => this.handleSearch("good", "mood")} />
                            <img className="emojiSelect" src={happy} />
                          </label>
                          {" "}
                          <label>
                            <input type="radio" value="neutral" name="mood" onChange={() => this.handleSearch("neutral", "mood")} />
                            <img className="emojiSelect" src={neutral} />
                          </label>
                          {" "}
                          <label>
                            <input type="radio" value="bad" name="mood" onChange={() => this.handleSearch("bad", "mood")} />
                            <img className="emojiSelect" src={sad} />
                          </label>
                        </div>
                      </div>
                    </div>
                </div>

                <div class = "searchelement">
                  <Button style={{backgroundColor:"#4B7268", width:"100%"}} onClick={() => this.handleSearch(this.state.searchContents, "title")} >Search</Button>
                </div>
                <div class = "searchelement">
                  <Button style={{backgroundColor:"#6c757d", width:"100%"}} onClick={() => this.handleClearSearch()} >Clear</Button>
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
