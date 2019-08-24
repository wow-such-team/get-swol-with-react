import React, { Component } from "react";
import './style.css';
import { Username, Password, Container, Row, Col } from '../../components/Login/userLogin';
import { LoginBtn } from "../../components/LoginBtn/loginbtn";
import { withRouter } from "react-router-dom";


class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    fetch('/api/users/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/home');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }

  renderRegisterPage = () => {
    this.props.history.push("/signup")
  };

  render() {
    return (
      <div id = "login-box">
      <Container fluid>
        
        <Row>
          <Col size="md-6">
            <h1>Sign In!</h1>
            <form>
              <Username
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
              <Password
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <LoginBtn onClick={this.onSubmit}>Sign In</ LoginBtn>
              <LoginBtn onClick={() => this.renderRegisterPage()}>Register</LoginBtn>
            </form>
          </Col>
        </Row>
        
      </Container>
      </div>
    );
  }

};

export default Login