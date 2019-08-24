import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
    return (
        <div id = "searchBackground">
            <div>
            <form class = "form">
                <div class="row">
                    <div class="col-2">
                
                    </div>
                    <div class="col-5" id= "search-save">
                        <input type="text" class="form-control" placeholder="Seach Keyword" name="search" onChange={props.onChange}/>
                    </div>
                    
                    <div class="col-3">
                
                    </div>
                </div>
            </form>
            </div>
                
        </div>
                );
              }
              
export default SearchForm;