import React, { Component } from "react";
import DropDown from "../../components/Dropdown/dropdown";
import SearchForm from "../../components/SearchBar/searchbar";
import Results from "../../components/Results/results";
import API from "../../utils/API";
import "./style.css";
import SearchButton from "../../components/SearchButton/searchButton";

class SearchWorkout extends Component {
  state = {
    search: "",
    selectMuscle: "Muscle Groups",
    muscleGroups: [],
    exercises: []
  };

  componentDidMount() {
    API.getAllMuscleGroups().then(res => {
      console.log(res.data);

      this.setState({
        muscleGroups: res.data
      });
    });
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    console.log("name: " + event.target.name);
    console.log("value: " + event.target.value);

    this.setState({
      [name]: value
    });
  }

  handleDropdownChange = event => {
    const { name, text } = event.target;
    console.log(name);
    console.log(event.target);
    console.log(event.target.text);

    this.setState({
      [name]: text
    });
  }

  handleUserClick = event => {
    console.log('clicked button');
    event.preventDefault();

    const data = {
      keyword: this.state.search,
      musclegroup: this.state.selectMuscle
    };

    API.getSearchResults(data)
    .then(res => {
      console.log(res.data);

      this.setState({
        exercises: res.data
      });
    });
  }

  saveItem = event => {
    event.preventDefault();
    
    let data = {
      "_id": event.target.value
    };
    console.log(data);

    API.saveToFavorites(data)
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <br></br>
        <div className="searchBar">
          <SearchForm onClick={this.handleUserClick} onChange={this.handleInputChange} />
        </div>
        <div className="searchDropDown">
          <DropDown options={this.state.muscleGroups} value={this.state.selectMuscle} onSelect={this.handleDropdownChange} />
        </div>
        <SearchButton onClick={this.handleUserClick} onChange={this.handleInputChange}/>
        <ul>
          {this.state.exercises.map(exercise => 
            <Results key={exercise._id} value={exercise} onClick={this.saveItem} />
          )}
        </ul>
      </div>
    );
  }

};

export default SearchWorkout;
