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
        .then(res => this.props.history.push("/home"))
        .catch(err => console.log(err))
    }

  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
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

            </form>
          </Col>
        </Row>
      </Container>
    );
  }

};

export default NewUser;