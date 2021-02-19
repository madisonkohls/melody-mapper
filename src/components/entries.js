import React, { Component } from "react"
import {Button, Col, Row, Container} from 'reactstrap'

const EntryBody = props => {
  const lines = props.entryData.map((line, index) => {
    return (
      <Container key={index} className = "shadow p-3 mb-5 bg-white rounded">
        <Row>
          <Col>
          <h2>{line.title}</h2>
          <small>{Date()}</small>
          <p>{line.body}</p>
          <Button onClick={() => props.removeEntry(index)}>Delete</Button>
          </Col>
        </Row>
      </Container>
    )
  })
  return (
    <div>
      {lines}
    </div>
  )
}
const Entries = (props) =>{
  const { entryData, removeEntry } = props;
  return (
    <div className = "Entries">
      <h2> My Entries </h2>
      <EntryBody entryData = {entryData} removeEntry={removeEntry}/>
    </div>
  )
}
export default Entries;
