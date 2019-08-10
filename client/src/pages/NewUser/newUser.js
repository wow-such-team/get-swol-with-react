import React from 'react';
import './style.css';
import CreateUser from '../../components/NewUser/newUser';


function NewUser (props){
    return (
        <div className="container">
           <div>
            <CreateUser/>
           </div>   
        </div>
    );
};

export default NewUser