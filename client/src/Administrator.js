import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label, Button } from "react-bootstrap";
import { GetUserInfo } from "./services/rewards.service";
import { RedeemReward, CancelReward } from "./services/administator.service";
class Administrator extends Component {
  state = {
    username: "",
    firstName: "",
    lastName: "",
    points: null,
    joined: "",
    pendingRewards: [],
    searched: false
  };

  searchUser = () => {
    GetUserInfo(this.state.username).then(response => {
      console.log(response);
      const data = response.data;
      this.setState({
        points: data.points,
        name: data.firstname + " " + data.lastname,
        joined: data.date,
        pendingRewards: data.pending_rewards,
        searched: true
      });
    });
  };
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onRedeem = id => {
    RedeemReward(this.state.username, id).then(() => {
      this.searchUser();
    });
  };
  onCancel = id => {
    CancelReward(this.state.username, id).then(() => {
      this.searchUser();
    });
  };
  render() {
    return (
      <div>
        <Grid className="first">
          <Row>
            <h1>Administrator</h1>
          </Row>
          <Row>
            <FormGroup>
              <Label>Search Username: </Label>
              <input
                className="inline"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
              />
              <button input="button" onClick={() => this.searchUser()}>
                Search
              </button>
            </FormGroup>
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
              <h2>Pending Completed Rewards:</h2>
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
                        <td
                          onClick={() => this.onRedeem(JSON.stringify(rewards))}
                        >
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
export default Administrator;
