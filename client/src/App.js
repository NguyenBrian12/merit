import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Rewards from "./Rewards";
import Home from "./Home";
import Header from "./Header";
import Administrator from "./Administrator";
import Events from "./Events";
import EventManager from "./EventManager";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/rewards" component={Rewards} />
          <Route exact path="/administrator" component={Administrator} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/eventManager" component={EventManager} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
