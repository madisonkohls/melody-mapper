import React, { Component } from "react"
import Entries from "./entries"
import Form from "./form"
import {Button, FormGroup, Input, Label} from 'reactstrap'
import axios from 'axios'
import happy from '../assets/happy.png';
import neutral from '../assets/neutral.png';
import sad from '../assets/sad.png';

// [0] is good, [8] is bad
let playlists = [
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX4uPi2roRUwU",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWSf2RDTDayIx",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXaXB8fQg7xif",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWZQaaqNMbbXa",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX802IXCAaWtY",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX8a1tdzq5tbM",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX6Z0nWFAx7KL",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWVrtsSlLKzro"
  ], //dance
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX5mB2C8gBeUM",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX5OrO2Jxuvdn",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX13ZzXoot6Jc",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXdxUH6sNtcDe",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX9hWdQ46pHPo",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXepGEFFmQXJ",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXdfhOsjRMISB",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXi7h4mmmkzD",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXamBAn43YNB9",
  ], // country
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX5Lm1ZiObdc3",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX4s3V2rTswzO",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX2aCk0vzzaZQ",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWUajed02NzWR",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX9OZisIoJQhG",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX7cBprxbt1Fn",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX0Aaer4Jzfgm",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXbm0dp7JzNeL",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWVFeEut75IAL"
  ], // classical music
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWVlYsZJXqdym",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX8ttEdg9VJHO",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXti3N4Wp5xy",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX92MLsP3K1fI",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXcOFePJj4Rgb",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXbIGqYf7WDxP",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWTwnEm1IYyoj",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWX3xqQKu0Sgn",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWYp3yzk1civi"
  ], // pop
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX8FwnYE6PRvL",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWYE5MI4mMuii",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWWJOmJ7nRx0C",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWWRktbhJiuqL",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX2aneNMeYHQ8",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWYctfAtweUtE",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWXs1L3AC0Xio",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX6xOPeSOGone"
  ], // rock
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWUFmyho2wkQU",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWU4xkXueiKGW",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX76t638V6CA8",
    "https://open.spotify.com/embed/playlist/38iI10NJQ5HY0ilCItMz5r",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWTIuAboZgTMf",
    "https://open.spotify.com/embed/playlist/5772HGqmp2E99GQo5tfmcJ",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWY4xHQp97fN6",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWT6MhXz0jw61",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX2y6end4Tb8T"
  ], // rap
  [
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX10zKzsJ2jva",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWUPj9VuIP3Gq",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWUPj9VuIP3Gq",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXbLMw3ry7d7k",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DX1QnNyJOBQBv",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWVIKVPO4xOlK",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWZufbpO1g3tw",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWYzTSrc7SiSZ",
    "https://open.spotify.com/embed/playlist/37i9dQZF1DXdqxfWN3raU3"
  ] // latin radio
];

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
      searchContents: ''
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

  handleSearch = (searchInp,searchCat) => { //searchCat has to be  a passed in string "title" or "mood"
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

  componentDidMount() {
    this.setState({ moodlist: playlists[0][0]})
  }

  handleChange = event => {
    const{name, value} = event.target
    this.setState({
      [name]: value})
     }

  render() {
    const { entries } = this.state;
    return (
      <div class = "journal">
        <div class = "journalelement">
          <h2 class = "titleText"> {this.state.addEdit} entry </h2>
          <Form handleSubmit={this.handleSubmit} clearForm={this.clearForm} userid={this.userID} mood = {this.props.mood} title={this.state.currTitle} body = {this.state.currBody}/>
        </div>
        <div class = "journalelement">
         <h2 class = "titleText"> search by title/mood </h2>
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
              <div class = "searchelement moodselect">
                <div id="select-mood" class="mood-content" >
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
              <div class = "searchelement">
                <Button style={{backgroundColor:"#4B7268"}} onClick={() => this.handleSearch(this.state.searchContents, "title")} >Search</Button>
              </div>
          </div>
          <Entries entryData={entries} removeEntry={this.removeEntry} editEntry={this.editEntry}/>
        </div>
      </div>
    )
  }
}

export default Journal;