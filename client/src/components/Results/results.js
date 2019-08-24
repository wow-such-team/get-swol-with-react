import React from 'react';

function Results(props) {
    return <li>{props.value.name} <button value={props.value._id} onClick={props.onClick}>❤︎</button></li>;
};

export default Results;