import React, { Component } from 'react';
import './style.css';
import API from '../../utils/API';
import TestList from './test.json';

class Sidebar extends Component {
    state = {
        favoriteExercises: []
    }

    componentDidMount() {
        this.loadExercises();
    }

    loadExercises = () => {
        const sessionData = JSON.parse(localStorage.getItem("session"));

        API.getUserFavEx(sessionData).then(res => {
            console.log(res.data)

            this.setState({
                favoriteExercises: res.data
            });
        }).catch(err => {
            alert(err);
        });;
    }

    drag = event => {
        console.log('drag');
        console.log(event.target);
        let data = event.dataTransfer.setData("text", event.target.id);
        console.log(data);
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

        API.deleteFromFavs(data)
            .then(res => {
                this.loadExercises();
                // API.getUserFavEx(data).then(res => {
                //     console.log(res.data)

                //     this.setState({
                //         favoriteExercises: res.data
                //     });
                // });
            }).catch(err => {
                alert(err);
            });;
    }

    render() {
        return (
            <div className='bd-sidebar'>
                <h4 id="savedHeader">My Saved Exercises ♡</h4>
                <ul id="sideBarList">
                    {this.state.favoriteExercises.map(items =>
                        <li className="listItems" draggable='true' onDragStart={this.drag} key={items._id} id={items._id}>
                            {items.name}
                            <button className="removeButtons" id={items._id} onClick={this.removeItem}>x</button>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
};

export default Sidebar;