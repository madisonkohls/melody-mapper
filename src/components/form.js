import React, { Component } from "react"
import {Button, FormGroup, Input, Label} from 'reactstrap'
import axios from 'axios'

class Form extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      title: "",
      body: ""
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
      title: this.state.title
    }
    axios.post('http://localhost:8000/journals/add', journal)
      .then(res => console.log(res.data))

    this.props.handleSubmit(this.state)
    this.setState(this.initialState)
  }
  render() {
    const { title, body } = this.state;
    return (
      <div>
        <form>
          <FormGroup>
          <Label> Title </Label>
          <Input
            type = "text"
            name = "title"
            id = "title"
            placeholder = "Your title here"
            value = {title}
            onChange = {this.handleChange} />
          </FormGroup>
          <FormGroup>
          <Label> Entry </Label>
          <Input
              type = "textarea"
              name = "body"
              id = "body"
              placeholder = "Your text here"
              value = {body}
              onChange = {this.handleChange} />
          </FormGroup>
        </form>
        <Button style={{backgroundColor:"#4B7268"}} onClick={this.submitForm}>Submit</Button>
      </div>
    )
  }
}
export default Form;
