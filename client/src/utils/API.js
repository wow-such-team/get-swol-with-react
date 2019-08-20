import axios from "axios";

export default {
    //creates new user
    newUser: function(userData) {
        console.log(userData);
        return axios.post("/api/users", userData)
    },
    //search for user
    searchUser: function(username) {
        console.log("username searching; " + username)
        return axios.get("/api/users/" + username)
    }
};