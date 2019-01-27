import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label, Button } from "react-bootstrap";
import { GetEvents, SubmitEvent, CancelEvent } from "./services/events.service";
class EventManager extends Component {
  state = {
    name: "",
    description: "",
    date: "",
    reward: "",
    events: []
  };
  componentDidMount() {
    GetEvents().then(response => {
      console.log(response);
      const data = response.data;
      this.setState({
        events: data,
        searched: true
      });
    });
  }
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onEdit = () => {};
  onCancel = id => {
    CancelEvent(id).then(() => {
      GetEvents().then(response => {
        console.log(response);
        const data = response.data;
        this.setState({
          events: data,
          searched: true
        });
      });
    });
  };
  submitEvent = () => {
    SubmitEvent({
      name: this.state.name,
      date: this.state.date,
      description: this.state.description,
      reward: this.state.reward
    }).then(() => {
      GetEvents().then(response => {
        console.log(response);
        const data = response.data;
        this.setState({
          events: data,
          searched: true
        });
      });
    });
  };
  render() {
    return (
      <div>
        <Grid className="first">
          <Row>
            <Col md={12}>
              <h1>Events</h1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h3>Add New Event</h3>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <div>
                  <Label>Event Name: </Label>
                </div>
                <input
                  className="inline"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>Date: </Label>
                </div>
                <input
                  className="inline"
                  type="text"
                  name="date"
                  value={this.state.date}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>Description: </Label>
                </div>
                <textArea
                  className="inline textbox"
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>Reward: </Label>
                </div>
                <input
                  className="inline"
                  type="text"
                  name="reward"
                  value={this.state.reward}
                  onChange={this.onChange}
                />
              </FormGroup>
              <div>
                <button input="button" onClick={() => this.submitEvent()}>
                  Submit
                </button>
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col md={12}>
              <h3>Events List</h3>
            </Col>
          </Row>
          {this.state.searched ? (
            <div>
              <table className="admin-table">
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Reward</th>
                  <th>Edit Event</th>
                  <th>Delete Event</th>
                </tr>
                {this.state.events
                  ? this.state.events.map(event => (
                      <tr>
                        <td>{event.name}</td>
                        <td>{event.date}</td>
                        <td>{event.description}</td>
                        <td>{event.reward}</td>
                        <td onClick={() => this.onEdit(event.id)}>
                          <i className="fas fa-edit" />
                        </td>
                        <td onClick={() => this.onCancel(event.id)}>
                          <i className="fas fa-trash-alt" />
                        </td>
                      </tr>
                    ))
                  : ""}
              </table>
            </div>
          ) : (
            ""
          )}
        </Grid>
      </div>
    );
  }
}
export default EventManager;
