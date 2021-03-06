import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label } from "react-bootstrap";
import { ReferFriend } from './services/referrals.service'

class Referrals extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    disp_message: false
  }

  renderMessage() {
    if(this.state.disp_message) {
      return (
        <p>
          Referral sent!
        </p>
      )
    }
  }

  render() {
    return (
      <Grid className="first">
      <Row>
      <Col md={12}>
      <h1>Refer a Friend</h1>
      <h3>Collect 100 points for each person you refer who becomes a volunteer</h3>
      </Col>
      </Row>
      <br/>
      <Row>
      <Col md={12}>
      <FormGroup>
        <Label>First Name: </Label>
        <input
          type="text"
          name="first_name"
          value={this.state.first_name}
          onChange={this.onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last Name: </Label>
        <input
          type="text"
          name="last_name"
          value={this.state.last_name}
          onChange={this.onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Email Address: </Label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
        />
      </FormGroup>
      <FormGroup>
        <button input="button" onClick={() => this.referFriend()}>
          Submit
        </button>
      </FormGroup>
      {this.renderMessage()}
      </Col>
      </Row>
      </Grid>
    )
  }
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      disp_message: false
    });
  };
  referFriend = () => {
    ReferFriend('jj92', this.state.first_name, this.state.last_name, this.state.email).then(() => {
      this.setState({
        first_name: '',
        last_name: '',
        email: '',
        disp_message: true
      })
    })
  }
}
export default Referrals
