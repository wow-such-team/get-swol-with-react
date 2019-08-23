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
        // API.getDayExercises(this.state.day).then(res => {
        //     console.log(res.data);
        //     this.setState({
        //         exercises: res.data
        //     });
        // });
    }

    render() {
        return (
            <div className='dayCard'>
                <div className='dayCardHead'>
                    {this.props.id}
                </div>
                <div className='dayCardBody' onDrop='drop(event)' onDragOver='allowDrop(event)'>
                    <div className='exercises'></div>
                </div>
            </div>
        );
    }
};

export default Weekday;