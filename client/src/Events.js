import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label, Button } from "react-bootstrap";
import { GetEvents, SignUpEvent, GetData } from "./services/events.service";
class Events extends Component {
  state = {
    events: [],
    searched: false
  };
  componentDidMount() {
    GetEvents().then(response => {
      console.log(response);
      const data = response.data;
      GetData().then(response2 => {
        const userInfo = response2.data;
        const pendingRewards = userInfo.pending_rewards;
        console.log(pendingRewards);
        const eventIds = [];
        for (let reward of pendingRewards) {
          eventIds.push(reward.id);
        }
        console.log(eventIds);
        const filteredEvents = [];
        for (var event of data) {
          if (!eventIds.includes(event.id)) {
            filteredEvents.push(event);
          }
        }
        this.setState({
          events: filteredEvents,
          searched: true
        });
      });
    });
  }

  onSignUp = id => {
    SignUpEvent(id).then(() => {
      GetEvents().then(response => {
        console.log(response);
        const data = response.data;
        GetData().then(response2 => {
          const userInfo = response2.data;
          const pendingRewards = userInfo.pending_rewards;
          console.log(pendingRewards);
          const eventIds = [];
          for (let reward of pendingRewards) {
            eventIds.push(reward.id);
          }
          console.log(eventIds);
          const filteredEvents = [];
          for (var event of data) {
            if (!eventIds.includes(event.id)) {
              filteredEvents.push(event);
            }
          }
          this.setState({
            events: filteredEvents,
            searched: true
          });
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

          {this.state.searched ? (
            <div>
              <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Reward</th>
                  <th>Sign Up</th>
                </tr>
                </thead>
                <tbody>
                {this.state.events
                  ? this.state.events.map(event => (
                      <tr>
                        <td>{event.name}</td>
                        <td className="nowrap">{event.date}</td>
                        <td>{event.description}</td>
                        <td>{event.reward}</td>
                        <td onClick={() => this.onSignUp(event.id)}>
                          <i className="fas fa-sign-in-alt" />
                        </td>
                      </tr>
                    ))
                  : ""}
                  </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Events;
