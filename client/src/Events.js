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
        console.log(filteredEvents);
      });
      this.setState({
        events: data,
        searched: true
      });
    });
  }
  onSignUp = id => {
    SignUpEvent(id).then(() => {
      this.props.history.push("/");
    });
  };
  render() {
    return (
      <div>
        <Grid className="first">
          <Row>
            <h1>Events</h1>
          </Row>

          {this.state.searched ? (
            <div>
              <table className="admin-table">
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Reward</th>
                  <th>Sign Up</th>
                </tr>
                {this.state.events
                  ? this.state.events.map(event => (
                      <tr>
                        <td>{event.name}</td>
                        <td className="noWrap">{event.date}</td>
                        <td>{event.description}</td>
                        <td>{event.reward}</td>
                        <td onClick={() => this.onSignUp(event.id)}>
                          <i className="fas fa-sign-in-alt" />
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
export default Events;
