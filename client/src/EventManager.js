import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label, Button } from "react-bootstrap";
import { RedeemReward, CancelReward } from "./services/administator.service";
import { GetEvents, SubmitEvent } from "./services/events.service";
class EventManager extends Component {
  state = {
    name: "",
    description: "",
    date: "",
    reward: null,
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
  onEdit = id => {
    RedeemReward(this.state.username, id).then(() => {
      this.searchUser();
    });
  };
  onCancel = id => {
    CancelReward(this.state.username, id).then(() => {
      this.searchUser();
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
            <h1>Events</h1>
          </Row>
          <Row>
            <h3>Add New Event</h3>
          </Row>
          <FormGroup>
            <Label>Event Name: </Label>
            <input
              className="inline"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Date: </Label>
            <input
              className="inline"
              type="text"
              name="date"
              value={this.state.date}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description: </Label>
            <input
              className="inline"
              type="text"
              name="name"
              value={this.state.description}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Reward: </Label>
            <input
              className="inline"
              type="text"
              name="reward"
              value={this.state.reward}
              onChange={this.onChange}
            />
          </FormGroup>
          <button input="button" onClick={() => this.submitEvent()}>
            Submit
          </button>

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
