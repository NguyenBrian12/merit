import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { GetData } from "./services/rewards.service";
class Rewards extends Component {
  state = {
    points: null,
    name: ""
  };
  componentDidMount() {
    GetData().then(response => {
      console.log(response);
      const data = response.data;
      this.setState({
        points: data.points,
        name: data.firstname
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
          <table className="log-table">
            <tbody>
              <tr>
                <td>
                  <div>100 Points:</div> <div>Certificate</div>
                </td>
                <td>
                  <div>250 Points:</div> <div>Swag</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>500 Points:</div>{" "}
                  <div>Front Page Feature on Make-A-Wish Website</div>
                </td>
                <td
                  style={{
                    backgroundImage:
                      "https://cdn.pixabay.com/photo/2017/09/11/11/02/coaching-2738522_960_720.jpg"
                  }}
                >
                  <div>1000 Points:</div>{" "}
                  <div>Mentorship with a Make-A-Wish Executive</div>
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </div>
    );
  }
}
export default Rewards;
