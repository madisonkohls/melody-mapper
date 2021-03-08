import React, { Component } from "react"
import {Button, Col, Row, Container} from 'reactstrap'
import good from '../assets/happy.png';
import neutral from '../assets/neutral.png';
import bad from '../assets/sad.png';


const EntryBody = props => {
  const lines = props.entryData.map((line, index) => {
    const date = new Date(line.date);
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'});
    let moodTag = "😊";
    if (line.mood == "neutral") {
      moodTag = "😐";
    }
    if (line.mood == "bad") {
      moodTag = "😔";
    }
    return (

      <Container key={index} className = "shadow p-3 mb-5 bg-white rounded">

        <Row>
          <Col>
          <small class="smallText date">{formattedDate}</small>
          <p class="smallText moodTag">{moodTag}</p>
          <h4 class="titleText entryTitle">{line.title}</h4>

          <p>{line.text}</p>
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
