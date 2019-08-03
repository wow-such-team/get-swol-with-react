import React from 'react';
import './style.css';
import TestList from './test.json';

function Sidebar() {
    return (
        <div className='bd-sidebar'>
            {TestList.map(items =>
                <ul>
                    <li> {items} </li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;