import React, { Component } from "react";
import './style.css';
import { Username, Password, Email, Container, Row, Col } from '../../components/Login/userLogin';
import { LoginBtn } from "../../components/LoginBtn/loginbtn";
import { withRouter } from "react-router-dom";
import API from "../../utils/API"
const bcrypt = require("bcryptjs");

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

      searchUser  = (event) => {
        event.preventDefault();
        if(this.state.username && this.state.email && this.state.password) {
          API.searchUser(this.state.username)
          .then(res => 
              {if(res.data.length === 0){
                  this.createUser();
              }
              else{
                document.getElementById("error").style.visibility = "visible"
              }
              console.log(res.data[0])
            }
          )
        }
    }

    createUser  = () => {
      if(this.state.username && this.state.email && this.state.password) {
          var salt = bcrypt.genSaltSync(10)
          var hash = bcrypt.hashSync(this.state.password, salt);
          API.newUser({
              username: this.state.username,
              email: this.state.email,
              password: hash,
              favoriteExercises: [],
              templates:[[], [], [], []]
          })
          .then(response => this.props.history.push("/home"))
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
                    onClick={this.searchUser}>
                    Create Account
                    </ LoginBtn>
                    <div id="error" style={{ visibility: 'hidden' }}>*This username already exists. Please update.</div>
                </form>
              </Col>
            </Row>
          </Container>
        );
    }

};

export default NewUser;