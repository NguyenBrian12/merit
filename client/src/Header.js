import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link className="header-element" to="/rewards">
          Rewards
        </Link>
        <Link className="header-element" to="/page2">
          Pages
        </Link>
        <Link className="header-element" to="/page3">
          Page3
        </Link>
      </div>
    );
  }
}

export default Header;
