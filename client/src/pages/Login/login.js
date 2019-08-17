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

      renderHomePage  = () => {
            this.props.history.push("/home")
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
                  <LoginBtn onClick={() => this.renderHomePage()}>Sign In</ LoginBtn>
                  <LoginBtn onClick={() => this.renderRegisterPage()}>Register</LoginBtn>
                </form>
              </Col>
            </Row>
          </Container>
        );
    }

};

export default Login