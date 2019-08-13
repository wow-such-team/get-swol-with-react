import axios from "axios";

export default {
    //creates new user
    newUser: function(userData) {
        return axios.post("/api/users", userData)
    }
};