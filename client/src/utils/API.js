import axios from "axios";

export default {
    //creates new user
    newUser: function (userData) {
        console.log(userData);
        return axios.post("/api/users/register", userData);
    },
    login: function(userData) {
        console.log(userData);
        return axios.post('/api/users/authenticate', userData);
    },
    logout: function(userData) {
        return axios.post('/api/users/logout', userData)
    },
    checkUser: function(sessionData) {
        return axios.post('/api/users/current', sessionData);
    },
    getAllExercises: function(userData) {
        return axios.post('/api/exercises/all', userData);
    },
    getUserFavEx: function(userData) {
        return axios.post('/api/users/data/favExercises', userData);
    },
    addExerciseToDay: function(data) {
        console.log(data);
        let url = "/api/users/data/" + data.day + "/exercises/add";
        return axios.post(url, data);
    },
    getDayExercises: function(data) {
        let url = "/api/users/data/" + data.day + "/exercises";
        return axios.post(url, data);
    },
    getSearchResults: function(data) {
        console.log("API muscle group: " + data.musclegroup);
        console.log("API keyword: " + data.keyword);
        
        return axios.post('/api/exercises/search', data);
    },
    getAllMuscleGroups: function(userData) {
        return axios.post('/api/exercises/musclegroups', userData);
    },
    deleteFromDay: function(data) {
        console.log(data);
        let url = "/api/users/data/" + data.day + "/removeItem"
        return axios.post(url, data);
    },
    deleteFromFavs: function(data) {
        console.log(data);

        return axios.post('/api/users/data/favorites/remove', data);
    },
    saveToFavorites: function(data) {
        console.log(data);

        return axios.post('/api/users/data/favorites/save', data);
    }
};