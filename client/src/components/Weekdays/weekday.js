import React, { Component } from 'react';
import './style.css';
import API from '../../utils/API';

class Weekday extends Component {
    state = {
        day: this.props.id,
        exercises: []
    }

    loadExercises = () => {
        const sessionData = JSON.parse(localStorage.getItem("session"));

        let data = {
            day: this.state.day,
            _id: sessionData._id,
            token: sessionData.token
        };

        console.log(data);

        API.getDayExercises(data).then(res => {
            console.log(res.data);
            this.setState({
                exercises: res.data
            })
        });
    }

    componentDidMount() {
        this.loadExercises();
    }

    drop = event => {
        event.preventDefault();

        const sessionData = JSON.parse(localStorage.getItem("session"));

        let data = {
            item: event.dataTransfer.getData("text"),
            day: this.state.day,
            _id: sessionData._id,
            token: sessionData.token
        };
        console.log('dropped');
        console.log(data);

        API.addExerciseToDay(data)
            .then(res => {
                API.getDayExercises(data).then(res => {
                    console.log(res.data);
                    this.setState({
                        exercises: res.data
                    });
                });
            }).catch(err => {
                alert(err);
            });;
    }

    allowDrop = event => {
        event.preventDefault();
    }

    removeItem = event => {
        event.preventDefault();

        console.log('clicked');

        const sessionData = JSON.parse(localStorage.getItem("session"));

        let data = {
            day: this.state.day,
            item: event.target.id,
            _id: sessionData._id,
            token: sessionData.token
        };
        console.log(data);

        API.deleteFromDay(data)
            .then(res => {
                API.getDayExercises(data).then(res => {
                    console.log(res.data);
                    this.setState({
                        exercises: res.data
                    });
                });
            }).catch(err => {
                alert(err);
            });;
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