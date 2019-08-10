import React from "react";
import { Link } from "react-router-dom";
import Logo from "./strawberry.png"
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <Link className="navbar-brand" to="/home">
        <a href="#" className="navbar-brand">
          <img src={ Logo } width="30" height="30" />
        </a>
        Berry Fit
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
              className={window.location.pathname === "/search"? "nav-link active": "nav-link"}
            >
            Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className={window.location.pathname === "/search"? "nav-link active": "nav-link"}
            >
            Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>    
  );
}

export default Navbar;
