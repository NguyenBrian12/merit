import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { GetData } from "./services/rewards.service";
import { GetEvents } from "./services/events.service";
class Rewards extends Component {
  state = {
    points: null,
    name: "",
    events: [],
    eventHistory: []
  };
  componentDidMount() {
    GetData().then(response => {
      console.log(response);
      const data = response.data;
      this.setState({
        points: data.points,
        name: data.firstname,
        eventHistory: data.rewards_history
      });
    });
    GetEvents().then(response => {
      const eventData = response.data;
      console.log(eventData);
      this.setState({
        events: eventData
      });
    });
  }
  render() {
    return (
      <div>
        <Grid className="first">
          <Row>
            <Col md={8}>
              <h1>My Rewards</h1>
            </Col>
            <Col md={4}>
              <h2 style={{ border: "solid" }}>
                Current Points: {this.state.points}
              </h2>
            </Col>
          </Row>
          <Row>
            <h2>Hi, {this.state.name}!</h2>
          </Row>
          <Row>
            <h2>Rewards Available:</h2>
          </Row>
          <Row>
            <Col md={3} className="reward img1">
              {" "}
              <div>100 Points:</div>
              <div>Free Small Coffee at Starbucks</div>
            </Col>
            <Col md={3} className="reward img2">
              {" "}
              <div>250 Points:</div> <div>Make-A-Wish Swag Bag</div>
            </Col>
            <Col md={3} className="reward img3">
              {" "}
              <div>400 Points:</div> <div>In-N-Out Giftcard</div>
            </Col>
            <Col md={3} className="reward img4">
              {" "}
              <div>500 Points:</div>{" "}
              <div>Front Page Feature on the Make-A-Wish Website</div>
            </Col>
            <Col md={3} className="reward img5">
              {" "}
              <div>600 Points:</div> <div>LA Ram's VIP Swag Box</div>
            </Col>
            <Col md={3} className="reward img6">
              {" "}
              <div>700 Points:</div> <div>Giftbag from Dollar Shave Club</div>
            </Col>
            <Col md={3} className="reward img7">
              {" "}
              <div>800 Points:</div> <div>Round Trip Ticket From Jet Blue</div>
            </Col>
            <Col md={3} className="reward img8">
              {" "}
              <div>1000 Points:</div>{" "}
              <div>Mentorship with a Make-A-Wish Executive</div>
            </Col>
          </Row>
          <Row>
            <h2>Reward History</h2>
          </Row>
          <Row>
            <Col md={4} className="history-table">
              Date
            </Col>
            <Col md={4} className="history-table">
              Decription
            </Col>
            <Col md={4} className="history-table">
              Points Gained
            </Col>
          </Row>
          {this.state.eventHistory
            ? this.state.eventHistory.map(history => (
                <Row>
                  <Col md={4} className="reward-body">
                    {history.date}
                  </Col>
                  <Col md={4} className="reward-body">
                    {history.description}
                  </Col>
                  <Col md={4} className="reward-body">
                    {history.point_value}
                  </Col>
                </Row>
              ))
            : ""}

          <Row>
            <h2>Pending Assignments</h2>
          </Row>
          <Row>
            <Col md={3} className="history-table">
              Name
            </Col>
            <Col md={3} className="history-table">
              Date
            </Col>
            <Col md={3} className="history-table">
              Description
            </Col>
            <Col md={3} className="history-table">
              Reward
            </Col>
          </Row>

          {this.state.events
            ? this.state.events.map(event => (
                <Row>
                  <Col md={3} className="reward-body">
                    {event.name}
                  </Col>
                  <Col md={3} className="reward-body">
                    {event.date}
                  </Col>
                  <Col md={3} className="reward-body">
                    {event.description}
                  </Col>
                  <Col md={3} className="reward-body">
                    {event.reward}
                  </Col>
                </Row>
              ))
            : ""}
        </Grid>
      </div>
    );
  }
}
export default Rewards;
