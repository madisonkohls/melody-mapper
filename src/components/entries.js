import React, { Component } from "react"
import {Button, Col, Row, Container} from 'reactstrap'



const EntryBody = props => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'});
  const lines = props.entryData.map((line, index) => {
    return (
      <Container key={index} className = "shadow p-3 mb-5 bg-white rounded">
        <Row>
          <Col>
          <h4 class="titleText">{line.title}</h4>
          <small class="date">{formattedDate}</small>
          <p>{line.body}</p>
          <Button style={{backgroundColor:"#4B7268"}} onClick={() => props.editEntry(index, line.title, line.body)}>Edit</Button>
          <Button style={{margin:"10px"}} onClick={() => props.removeEntry(index)}>Delete</Button>

          </Col>
        </Row>
      </Container>
    )
  })
  if (lines == '') {
    return (
      <div>
        <p>No entries yet.</p>
      </div>
    )
  }
  return (
    <div>
      {lines}
    </div>
  )
}
const Entries = (props) =>{
  const { entryData, removeEntry, editEntry } = props;

  return (
    <div className = "Entries">
      <h2 class="titleText"> today's entries </h2>
      <EntryBody entryData = {entryData} removeEntry={removeEntry} editEntry={editEntry}/>
    </div>
  )
}

export default Entries;
