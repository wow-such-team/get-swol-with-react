import React from 'react';
import "./style.css";

function Results(props) {
    return <li > {props.value.name} <button class = "saveButton" value={props.value._id} onClick={props.onClick}>♡</button></li>;
};

export default Results;