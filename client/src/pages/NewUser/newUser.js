import React, { Component } from "react";
import './style.css';
import { Username, Password, Email, Container, Row, Col } from '../../components/Login/userLogin';
import { LoginBtn } from "../../components/LoginBtn/loginbtn";
import { withRouter } from "react-router-dom";
import API from "../../utils/API"


class NewUser extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  createUser = event => {
    event.preventDefault();
    if (this.state.username && this.state.email && this.state.password) {
      API.newUser({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          // store token & _id in localStorage
          localStorage.setItem('session', JSON.stringify(res.data));
          this.props.history.push("/home")})
        .catch(err => {
          this.setState({
            error: err.response.data
          });
          console.log(err);
        })
    }

  }

  render() {
    return (
      <div id="login-box">
      <Container fluid>
        <Row>
          <Col id="loginBox" size="md-6">
            <h1>Register!</h1>
            <form>
              <Username
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="username (required)"
              />
              <Email
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email (required)"
              />
              <Password
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="password (required)"
              />
              <LoginBtn
                disabled={!(this.state.username && this.state.email && this.state.password)}
                onClick={this.createUser}>
                Create Account
                    </ LoginBtn>
              <div className="errorMessage">{this.state.error}</div>

            </form>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }

};

export default NewUser;