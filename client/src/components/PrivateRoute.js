import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            let sessionData = localStorage.getItem('session');

            if (sessionData !== "" && (JSON.parse(sessionData) !== null)) {
                API.checkUser(JSON.parse(sessionData))
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            this.setState({ loading: false });
                            console.log('it went through');
                        } else {
                            const error = new Error(res.error);
                            throw error;
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        console.log('private route error');
                        this.setState({ loading: false, redirect: true });
                    });
            }
            else {
                console.log('that did not work');
                this.setState({
                    loading: false,
                    redirect: true
                });
            }
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
}