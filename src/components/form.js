import React, { Component } from "react"
import {Button, FormGroup, Input, Label} from 'reactstrap'
import axios from 'axios'

class Form extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      title: "",
      body: "",
    }
    this.state = this.initialState
  }
  handleChange = event => {
    const{name, value} = event.target
    this.setState({
      [name]: value
    })
  }
  submitForm = () => {
    const journal = {
      userid : this.props.userid, //this.userid
      text : this.state.body,
      date : new Date(),
      title: this.state.title,
      mood: this.props.mood,
    }

    axios.post('http://localhost:8000/journals/add', journal)
      .then(res => console.log(res))

    this.props.handleSubmit(this.state)
    this.setState(this.initialState)
  }

  /*
 componentDidMount() {
   axios.get('http://localhost:5000/journals')
     .then(response => {
       journals =response.data;
     })
     .catch((error) => {
       console.log(error);
     })
 }
 
 //add substring stuff
 searchJournals = journalTitle => {
   var i = 0;
   for( i = 0; i < journals.length; i++ )
   {
     if(journals[i].userid == this.props.userid)
     {
       if (journals[i].title == journalTitle)
         {
           return journals[i];
         }
     }
   }
 }
 */

  clearForm = event => {
    this.setState(this.initialState);
    this.props.clearForm();
  }

  render() {
    if (this.state.title == "" && this.props.title != "") {
      this.setState({
        title: this.props.title,
      })
    }
    if (this.state.body == "" && this.props.body != "") {
        this.setState({
          body: this.props.body,
        })
    }
    return (
      <div>
        <form>
          <FormGroup>
          <Label> Title </Label>
          <Input
            type = "text"
            name = "title"
            id = "title"
            placeholder = "Your title here."
            value = {this.state.title}
            onChange = {this.handleChange} />
          </FormGroup>
          <FormGroup>
          <Label> Entry </Label>
          <Input
              type = "textarea"
              name = "body"
              id = "formbody"
              placeholder = "Your entry here."
              value = {this.state.body}
              onChange = {this.handleChange} />
          </FormGroup>
        </form>
        <Button style={{backgroundColor:"#4B7268"}} onClick={this.submitForm}>Submit</Button>
        <Button style={{margin:"10px"}} onClick={this.clearForm}>Clear</Button>
      </div>
    )
  }
}
export default Form;

