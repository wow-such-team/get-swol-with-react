const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },
    grossMuscle: {
        type: String,
        trim: true
    }
});

// schema for the user collection
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
    password: { // salt + hash
        type: String,
        required: "You must have a password."
    },
    // for storing the IDs all of the user's saved exercises
    favoriteExercises: Array,
    // each template is a weekly calendar the user can use to customize their weekly exercises using their saved exercises
    sunday: Array,
    monday: Array,
    tuesday: Array,
    wednesday: Array,
    thursday: Array,
    friday: Array,
    saturday: Array
});

userSchema.pre('save', function (next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, 10,
            function (err, hashedPassword) {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});

// compares the entered password against the hash
userSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
};

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        username: this.username,
        token: this.generateJWT()
    };
};

// create models based on schema
const Exercise = mongoose.model("Exercise", exerciseSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    Exercise: Exercise,
    User: User
};