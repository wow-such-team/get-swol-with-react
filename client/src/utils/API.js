import axios from "axios";

export default {
    //creates new user
    newUser: function (userData) {
        console.log(userData);
        return axios.post("/api/users/register", userData);
    },
    logout: function() {

    },
    getAllExercises: function() {
        return axios.get('/api/exercises/all');
    },
    getUserFavEx: function() {
        return axios.get('/api/users/data/favExercises');
    },
    addExerciseToDay: function(data) {
        console.log(data);
        let url = "/api/users/data/" + data.day + "/exercises";
        return axios.post(url, data);
    },
    getDayExercises: function(day) {
        let url = "/api/users/data/" + day + "/exercises";
        return axios.get(url);
    },
    getSearchResults: function(keyword, musclegroup) {
        console.log("API muscle group: " + musclegroup);
        console.log("API keyword: " + keyword);

        let url = "/api/exercises/" + musclegroup + "/search";
        let data = {keyword: keyword};
        return axios.post(url, data);
    },
    getAllMuscleGroups: function() {
        return axios.get('/api/exercises/musclegroups');
    },
    deleteFromDay: function(data) {
        console.log(data);
        let url = "/api/users/data/" + data.day + "/removeItem"
        return axios.post(url, data);
    },
    deleteFromFavs: function(data) {
        console.log(data);

        return axios.post('/api/users/data/favorites/remove', data);
    }
};