import React, { Component } from 'react';
import './style.css';
import API from '../../utils/API';

class Weekday extends Component {
    state = {
        day: this.props.id,
        exercises: []
    }

    drop = event => {
        console.log(this.state.day);
    }

    componentDidMount() {
        console.log(this.state.day);
        API.getDayExercises(this.state.day).then(res => {
            console.log(res.data);
            this.setState({
                exercises: res.data
            });
        });
    }

    drop = event => {
        event.preventDefault();

        let data={
            "_id": event.dataTransfer.getData("text"),
            "day": this.state.day};
        console.log('dropped');
        console.log(data);

        API.addExerciseToDay(data)
        .then(res => {
            API.getDayExercises(this.state.day).then(res => {
                console.log(res.data);
                this.setState({
                    exercises: res.data
                });
            });
        });
    }

    allowDrop = event => {
        event.preventDefault();
    }

    removeItem = event => {
        event.preventDefault();

        console.log('clicked');
        let data = {
            "day": this.state.day,
            "_id": event.target.id
        };
        console.log(data);

        API.deleteFromDay(data)
        .then(res => {
            API.getDayExercises(this.state.day).then(res => {
                console.log(res.data);
                this.setState({
                    exercises: res.data
                });
            });
        });
    }

    render() {
        return (
            <div className='dayCard'>
                <div className='dayCardHead'>
                    {this.props.id}
                </div>
                <div className='dayCardBody' onDrop={this.drop} onDragOver={this.allowDrop}>
                    <div className='exercises'>
                        <ul id="exerciseBox">
                            {this.state.exercises.map(items =>
                                <li className="listItemsInCalendar" key={items._id}> {items.name} <button className="removeButtonsInCalendar" id={items._id} onClick={this.removeItem}>x</button></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

export default Weekday;