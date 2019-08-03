import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
    return (
        <div>
            <form>
                <div class="row">
                    <div class="col-2">
                
                    </div>
                    <div class="col-5">
                        <input type="text" class="form-control" placeholder="Seach Keyword"/>
                    </div>
                    <div class="col-1">
                        <button type="submit" class="btn btn-primary" id="searchButton">Search</button>
                    </div>
                    <div class="col-2">
                
                    </div>
                </div>
            </form>
            
                
        </div>
                );
              }
              
export default SearchForm;