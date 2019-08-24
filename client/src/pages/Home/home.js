import React, { Component } from 'react';
import './style.css';
import Calendar from '../../components/Calendar/calendar';
import Sidebar from '../../components/Sidebar/sidebar';
import API from '../../utils/API';

class Home extends Component {
    

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="">
                        <Calendar />
                    </div>
                    <div className="">
                        <Sidebar />
                    </div>
                </div>
            </div>
        );
    };
};

export default Home;