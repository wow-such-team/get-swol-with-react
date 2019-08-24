import React from "react";
import "./style.css";


function SearchButton(props) {
    return (
        <div>
            <div class="col-5">

            </div>
            <div class="col-1" id="search-save">
                <button type="submit" class="btn btn-primary" id="searchButton" onClick={props.onClick}>Search</button>
            </div>

            <div class="col-3">

            </div>
        </div>
    )
}
export default SearchButton;