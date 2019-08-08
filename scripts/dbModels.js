import mongoose from 'mongoose';

// Get reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

// create new schema object for exercises collection
const exerciseSchema = new Schema({
    // name of exercise
    name: {
        type: String,
        trim: true,
        required: "Exercise name is required."
    },
    // muscle being worked out
    muscle: {
        type: String,
        trim: true,
        required: "Target muscle/muscle group required."
    }
});

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: "This username has already been used.",
        required: "Username is required."
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid email address."]
    },
    password: {
        type: String,
        required: "You must have a password."
    },
    // for storing the IDs all of the user's saved exercises
    favoriteExercises: Array,
    // each template is a weekly calendar the user can use to customize their weekly exercises using their saved exercises
    template1: Array,
    template2: Array,
    template3: Array,
    template4: Array
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    Exercise,
    User
};