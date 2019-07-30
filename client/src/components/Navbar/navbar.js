
//sets up the reusable Navbar component
import React, { Component } from "react";
import "./navbar.css";

class navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
         <ul>
          <li className="itemLeft">Home</li>
          <li className="itemCenter">Search Workouts</li>
          <li className="itemRight">Settings</li>
        </ul>
      </nav>
    );
  }
}

export default navbar;