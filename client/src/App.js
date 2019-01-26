import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Rewards from "./Rewards";
import Home from "./Home";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/rewards" component={Rewards} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
