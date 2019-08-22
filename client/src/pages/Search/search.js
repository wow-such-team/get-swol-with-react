import React, { Component } from "react";
import DropDown from "../../components/Dropdown/dropdown";
import SearchForm from "../../components/SearchBar/searchbar";
import Results from "../../components/Results/results";
import API from "../../utils/API";
//import "./style.css";

var muscleGroup = ['abdominals', 'chest', 'shoulders'];

class SearchWorkout extends Component {
  state = {
    exercises: []
  };

  componentDidMount() {
    console.log('list of exercises');
    // this.setState({
    //   exercises: API.getAllExercises()
    // });
    API.getAllExercises().then((res) => {
      console.log(res.data)
      this.setState({
        exercises: res.data
      });
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div className="searchBar">
          <SearchForm />
        </div>
        <br>
        </br>
        <div className="searchDropDown">
          <DropDown values={muscleGroup} />
        </div>
        <ul>
          {this.state.exercises.map(exercise => 
            <Results value={exercise} />
          )}
        </ul>
      </div>
    );
  }

};

export default SearchWorkout;
