import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label } from "react-bootstrap";
import { GetUserInfo } from "./services/rewards.service";
class Administrator extends Component {
  state = {
    username: "",
    firstName: "",
    lastName: "",
    points: null,
    Add: null,
    Remove: null,
    Joined: ""
  };

  searchUser = () => {
    GetUserInfo().then(response => {
      console.log(response);
      const data = response.data;
      this.setState({
        points: data.points,
        name: data.firstname
      });
    });
  };

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <FormGroup>
              <Label>Username:</Label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Administrator;
