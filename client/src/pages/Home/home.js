import React from 'react';
import './style.css';
import Calendar from '../../components/Calendar/calendar';
import Sidebar from '../../components/Sidebar/sidebar';

function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-10">
                    <Calendar />
                </div>
                <div className="col-2">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default Home;