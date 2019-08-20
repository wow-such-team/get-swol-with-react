import React, { Component } from "react";
import './style.css';
import { Username, Password, Container, Row, Col } from '../../components/Login/userLogin';
import { LoginBtn } from "../../components/LoginBtn/loginbtn";
import { withRouter } from "react-router-dom";
import API from "../../utils/API"
const bcrypt = require("bcryptjs");

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

    renderHomePage  = (event) => {
      //to see if the username and password match and then allow the user to log in.
          event.preventDefault();
          console.log("search this: " + this.state.username)
          API.searchUser(this.state.username)
          .then(res => 
            {if (res.data.length !== 0) {
              console.log(res.data[0])
              bcrypt.compare(this.state.password, res.data[0].password, function(err, results) {
                if(results === true) {
                  document.location = "/home"
                }
                else {
                  document.getElementById("incorrect").style.visibility = "visible"
                }
              })
            }
          else {
            console.log("username does not exists.")
            document.getElementById("incorrect").style.visibility = "visible"
          }}
          )  
      }

    renderRegisterPage  = () => {
          this.props.history.push("/signup")
      };

    render() {
        return (
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
                  <LoginBtn onClick={this.renderHomePage}>Sign In</ LoginBtn>
                  <LoginBtn onClick={() => this.renderRegisterPage()}>Register</LoginBtn>
                  <div id="incorrect" style={{ visibility: 'hidden' }}>*Username or password is incorrect</div>
                </form>
              </Col>
            </Row>
          </Container>
        );
    }

};

export default Login