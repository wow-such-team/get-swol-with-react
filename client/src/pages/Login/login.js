import React from 'react';
import './style.css';
import UserLogin from '../../components/Login/userLogin';

function Login (props){
    return (
        <div className="container">
           <div>
            <UserLogin/>
           </div>   
        </div>
    );
};

export default Login