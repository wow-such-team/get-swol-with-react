import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from '../../utils/API';
import Logo from "./Logo.png"
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Navbar extends Component {
  state = {
    user: "",
    loggedIn: "Login"
  }

  componentDidMount() {
    this.checkStatus();
  }

  checkStatus = () => {
    let sessionData = localStorage.getItem('session');

    console.log(sessionData);

    if (sessionData !== "" && JSON.parse(sessionData) !== null) {
      API.checkUser(JSON.parse(sessionData))
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.setState({
              user: `Hello, ${res.data.user}`,
              loggedIn: "Logout"
            });
          }
          else {
            this.setState({
              user: "",
              loggedIn: "Login"
            });
          };

        });
    } else {
      this.setState({
        user: "",
        loggedIn: "Login"
      });
    };
  }

  logout = () => {
    let sessionData = localStorage.getItem('session');

    if (sessionData !== "" && JSON.parse(sessionData) !== null) {
      API.logout(JSON.parse(sessionData))
        .then(res => {
          localStorage.setItem('session', "");
          this.checkStatus();
        })
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light">
        <Link className="navbar-brand" to="/home">
          <a href="#" className="navbar-brand">
            <img src={Logo} width="50" height="43" />
          </a>
          Berry Fit
          <span id='greeting'>{this.state.user}</span>
        </Link>
        <div className="ml-auto">
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item" id="home-button">
              <Link
                to="/home"
                className={window.location.pathname === "/" || window.location.pathname === "/home" ? "nav-link active" : "nav-link"}
              >
                Home
            </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
              >
                Search
            </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login" onClick={this.logout}
                className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}
              >
                {this.state.loggedIn}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
