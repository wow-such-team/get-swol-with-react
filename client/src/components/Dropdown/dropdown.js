import React from "react";
//import "./style.css";


// Using the datalist element we can create autofill suggestions based on the props.breeds array
function DropDown(props) {
    return (
        <div>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Muscle Groups
            </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {props.values.map(muscles =>
                        <a className="dropdown-item" href="#"> {muscles} </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropDown;