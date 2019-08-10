import React from 'react';
import './style.css';

function Weekday(props) {
    return (
        <div className='dayCard'>
            <div className='dayCardHead'>
                {props.id}
            </div>
            <div className='dayCardBody' ondrop='drop(event)' ondragover='allowDrop(event)'>
                <div className='exercises'></div>
            </div>
        </div>
    );
};

export default Weekday;