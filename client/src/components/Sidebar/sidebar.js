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

    render() {
        return (
            <div className='bd-sidebar'>
                {this.state.favoriteExercises.map(items =>
                    <ul>
                        <li draggable='true' key={items._id}> {items.name} </li>
                    </ul>
                )}
            </div>
        );
    }
};

export default Sidebar;