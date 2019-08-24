import React from "react";
import "./style.css";



function DropDown(props) {
    return (
        <div>
            <div className="dropdown" >
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {props.value}
            </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {props.options.map(muscles =>
                        <a className="dropdown-item" key={muscles} onClick={props.onSelect} name="selectMuscle"> {muscles} </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropDown;