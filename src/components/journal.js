import React, { Component } from "react"
import Entries from "./entries"
import Form from "./form"
import SearchField from "react-search-field";

//import axios from 'axios'

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

class Journal extends Component {
  userID = this.props.userID;
  state = {
    entries:[
    ],
    moodlist: "",
  }


  removeEntry = index => {
    const { entries } = this.state

    this.setState({
      entries: entries.filter ((entry, i) => {
        return i != index
      })
    })
  }
/*

*/
  handleSubmit = entry => {

    this.setState({ entries: [...this.state.entries, entry]})
  }
  handleSearchInputChange = entry => {
    //do the search
    //this.setState({ entries: //search results
  }

  componentDidMount() {

    this.setState({ moodlist: playlists[0][0]})
  }

  render() {
    const { entries } = this.state;
    return (
      <div class = "journal">
        <div class = "journalelement">
        <h2 class = "titleText"> add a new entry </h2>
        <Form handleSubmit={this.handleSubmit} userid = {this.userID}/>
        <div class = "spotify">
        <iframe src={this.state.moodlist} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
            <Entries entryData={entries} removeEntry={this.removeEntry}/>
        </div>
      </div>
    )
  }

}
export default Journal;
