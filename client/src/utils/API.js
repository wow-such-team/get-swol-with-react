import axios from "axios";

export default {
    //creates new user
    newUser: function (userData) {
        console.log(userData);
        return axios.post("/api/users/register", userData)
    },
    logout: function() {

    },
    getAllExercises: function() {
        return axios.get('/api/exercises/all');
    }
};