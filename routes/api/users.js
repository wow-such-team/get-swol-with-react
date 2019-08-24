require('dotenv').config();
const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// const controller = require("../../controller/controller");
const withAuth = require('../auth');
const Models = require('../../models/dbModels');
// const secret = process.env.SECRET

const generateNewToken = function () {
    return crypto.randomBytes(64).toString('hex');
};

// router.route("/")
//     .post(controller.newUser);

// POST route to register a user
router.post('/register', function (req, res) {
    const { username, email, password } = req.body;
    const user = new Models.User({ username, email, password });
    user.save(function (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                console.log(err);
                return res.status(422).send("This username is already taken. Please choose another username.");
            }
            else if (err.name==="ValidationError") {
                return res.status(400).send("Please enter a valid email.");
            }

            // Some other error
            console.log(err);
            return res.status(500).send("Error registering new user. Please try again.");
        }
        else {
            console.log('it made it here');
            const data = {
                _id: user._id,
                token: user.token
            };

            res.status(200).send(data);
        }
    });
});

router.post('/authenticate', function (req, res) {
    const { username, password } = req.body;

    Models.User.find({ username: username }).then(user => {
        console.log(username);
        // res.send(user);
        if (username !== user[0].username) {
            res.status(401)
                .json({
                    error: 'Incorrect username'
                });
        } else {
            user[0].validatePassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again v2'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect password'
                        });
                } else { // is password is correct, generate new token & send it to front end
                    // create new token for user

                    const newToken = generateNewToken();

                    Models.User.findByIdAndUpdate(user[0]._id, { token: newToken }).then(result => {
                        const data = {
                            _id: result._id,
                            token: newToken
                        };

                        res.status(200).send(data);
                    });
                }
            });
        }
    });
});

router.post('/current', withAuth, function (req, res) {
    const { _id } = req.body;
    console.log(_id);

    // if (req.body) {
    Models.User.findById(_id, function (err, user) {
        let results = {
            status: 200,
            user: user.username
        }

        res.send(results);
    });
    // };
});

router.post('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});

router.post('/logout', withAuth, function (req, res) {
    const { _id, token } = req.body;

    // upon logging out, new token is generated so it no longer matches what is stored client side
    const newToken = generateNewToken();

    Models.User.findByIdAndUpdate(_id, { token: newToken }).then(result => {
        const data = {
            _id: result._id,
            token: newToken
        };

        res.status(200).send(data);
    });
});

// using user 'kim' as an example
// const user1 = 'jon';
// const user2 = "5d60cd8be539be6130301c70";

// get favorite Exercises from user kim's document
router.post("/data/favExercises", withAuth, function (req, res) {

    const { _id } = req.body;

    Models.User.findById(_id)
        .then(results => {
            // array to store results of user's favorite Exercises; returns an array of _id's
            const favoriteExercises = results.favoriteExercises;

            // query call to exercise collection to get exercise information for _id's
            Models.Exercise.find({ '_id': { $in: favoriteExercises } })
                .then(results2 => {
                    res.send(results2);
                });
        })
        .catch(err => {
            res.send(err);
        });
});

// save exercise to user's favoriteExercises template
router.post('/data/favorites/save', withAuth, function (req, res) {
    const { _id } = req.body;

    const toSave = req.body.item

    Models.User.findByIdAndUpdate(_id, { $addToSet: { favoriteExercises: toSave } }, err => {
        if (err) {
            res.status(500)
                .send('could not save to favorites');
        }
        else {
            res.send('saved: ' + toSave);
        };
    })
})

// add a favorite exercise to a day of the week array
router.post('/data/:day/exercises/add', withAuth, function (req, res) {
    const { _id } = req.body;
    const day = req.params.day;
    const data = req.body;
    let toUpdate = {};
    toUpdate[day] = data.item;

    Models.User.findByIdAndUpdate(_id, { $push: toUpdate }, err => {
        if (err) {
            res.status(500)
                .send('could not update day ' + day + ' b/c ' + err);
        }
        else {
            res.send(toUpdate);
        };
    });
});


// pull the data in the day of week array
router.post('/data/:day/exercises', withAuth, function (req, res) {
    const { _id } = req.body;
    const day = req.params.day;

    Models.User.findById(_id)
        .then(results => {
            const exercises = results[day];

            Models.Exercise.find({ '_id': { $in: exercises } })
                .then(results2 => {
                    res.send(results2);
                })
                .catch(err => {
                    alert(err);
                });
        });
})

// remove item from day of week array
router.post('/data/:day/removeItem', withAuth, function (req, res) {
    const { _id } = req.body;
    const day = req.params.day;
    const data = req.body;
    let toRemove = {};
    toRemove[day] = data.item;

    Models.User.updateOne({ _id: _id }, { $pull: toRemove }, err => {
        if (err) {
            res.status(500).send('could not remove');
        }
        else {
            res.send(toRemove);
        };
    });
})

// remove item from favoriteEXercises array
router.post('/data/favorites/remove', withAuth, function (req, res) {
    const { _id } = req.body;
    const data = req.body;

    Models.User.updateOne({ _id: _id }, { $pull: { favoriteExercises: data.item } }, err => {
        if (err) {
            res.status(500).send('could not remove');
        }
        else {
            res.send('removed!');
        };
    });
})

module.exports = router;