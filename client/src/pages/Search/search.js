import React from "react";
import DropDown from "../../components/Dropdown/dropdown";
import SearchForm from "../../components/SearchBar/searchbar"
//import "./style.css";

var muscleGroup = ['abdominals', 'chest', 'shoulders'];

function SearchWorkout() {
  return (
    <div>
      <div className= "searchBar">
        <SearchForm />
      </div>
      <br>
      </br>
      <div className = "searchDropDown">
        <DropDown values={muscleGroup} />
      </div>
    </div>
  );

};

export default SearchWorkout;
