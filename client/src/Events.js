import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label, Button } from "react-bootstrap";
import { GetEvents } from "./services/events.service";

class Events extends Component {
  state = {
    pendingRewards: [],
    searched: false
  };
  componentDidMount() {
    this.getEvents = () => {
      GetEvents().then(response => {
        console.log(response);
        const data = response.data;
        this.setState({
          pendingRewards: data.pending_rewards,
          searched: true
        });
      });
    };
  }
  render() {
    return (
      <div>
        <Grid className="first">
          <Row>
            <h1>Events</h1>
          </Row>

          {this.state.searched ? (
            <div>
              <h2>Volunteer Info:</h2>
              <Row>
                <Col className="user-data" md={4}>
                  <p>Name: {this.state.name}</p>
                  <p>Points: {this.state.points}</p>
                  <p>Joined: {this.state.joined}</p>
                </Col>
              </Row>
              <h2>Pending Rewards:</h2>
              <table className="admin-table">
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Point Value</th>
                  <th>Redeem</th>
                  <th>Cancel</th>
                </tr>
                {this.state.pendingRewards
                  ? this.state.pendingRewards.map(rewards => (
                      <tr>
                        <td>{rewards.date}</td>
                        <td>{rewards.description}</td>
                        <td>{rewards.point_value}</td>
                        <td onClick={() => this.onRedeem(rewards.id)}>
                          <i className="fas fa-check" />
                        </td>
                        <td onClick={() => this.onCancel(rewards.id)}>
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
export default Events;
