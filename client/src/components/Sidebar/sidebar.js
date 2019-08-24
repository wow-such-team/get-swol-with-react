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

    loadExercises= () => {
        API.getUserFavEx().then(res => {
            console.log(res.data)

            this.setState({
                favoriteExercises: res.data
            });
        });
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
        let data = {
            "day": this.state.day,
            "_id": event.target.id
        };
        console.log(data);

        API.deleteFromFavs(data)
        .then(res => {
            API.getUserFavEx().then(res => {
                console.log(res.data)
    
                this.setState({
                    favoriteExercises: res.data
                });
            });
        });
    }

    render() {
        return (
            <div className='bd-sidebar'>
                <ul>
                {this.state.favoriteExercises.map(items =>
                    
                        <li draggable='true' onDragStart={this.drag} key={items._id} id={items._id}>
                            {items.name}
                            <button id={items._id} onClick={this.removeItem}>x</button>
                        </li>
                    
                )}
                </ul>
            </div>
        );
    }
};

export default Sidebar;