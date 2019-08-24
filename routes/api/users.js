require('dotenv').config();
const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
// const controller = require("../../controller/controller");
const withAuth = require('../auth');
const Models = require('../../models/dbModels');
const secret = process.env.SECRET

// router.route("/")
//     .post(controller.newUser);

// POST route to register a user
router.post('/register', function (req, res) {
    const { username, email, password } = req.body;
    const user = new Models.User({ username, email, password });
    user.save(function (err) {
        if (err) {
            res.status(500)
                .send("Error registering new user please try again.");
        } else {
            res.status(200).send("Welcome to the club!");
        }
    });
});

router.post('/authenticate', function (req, res) {
    const { username, password } = req.body;
    Models.User.findOne({ username }, function (err, user) {
        console.log(username);
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again v1'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect username or password'
                });
        } else {
            user.validatePassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again v2'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect username or password'
                        });
                } else {
                    // Issue token
                    const payload = { username };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true })
                        .sendStatus(200);
                }
            });
        }
    });
});

router.get('/current', withAuth, function (req, res) {
    const { username } = req.body;
    Models.User.findOne({ username }, function (err, user) {
        res.send(user);
    });
});

router.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});

router.get('/logout', withAuth, function(req, res) {

});

// using user 'kim' as an example
const user1 = 'john';

// get favorite Exercises from user kim's document
router.get("/data/favExercises", function(req, res) {
    Models.User.find({username: user1})
    .then(results => {
        // array to store results of user's favorite Exercises; returns an array of _id's
        const favoriteExercises = results[0].favoriteExercises;

        // query call to exercise collection to get exercise information for _id's
        Models.Exercise.find({'_id': {$in: favoriteExercises}})
        .then(results2 =>{
            res.send(results2);
        });
    })
    .catch(err => {
        alert(err);
    });
});

// save exercise to user's favoriteExercises template
router.post('/data/favorites/save', function(req, res) {
    const toSave = req.body._id
    Models.User.findOneAndUpdate({username: user1}, {$addToSet: {favoriteExercises: toSave}}, err => {
        if(err) {
            res.status(500)
                .send('could not save to favorites');
        }
        else {
            res.send('saved: ' + toSave);
        };
    })
})

// add a favorite exercise to a day of the week array
router.post('/data/:day/exercises', function(req, res) {
    const day = req.params.day;
    const data = req.body;
    let toUpdate = {};
    toUpdate[day] = data._id;

    Models.User.findOneAndUpdate({username: user1}, {$push: toUpdate}, err => {
        if(err) {
            res.status(500)
                .send('could not update day ' + day + ' b/c ' + err);
        }
        else {
            res.send(toUpdate);
        };
    });
});


// pull the data in the day of week array
router.get('/data/:day/exercises', function(req, res) {
    const day = req.params.day;

    Models.User.find({username: user1})
    .then(results => {
        const exercises = results[0][day];

        Models.Exercise.find({'_id': {$in: exercises}})
        .then(results2 => {
            res.send(results2);
        })
        .catch(err => {
            alert(err);
        });
    });
})

// remove item from day of week array
router.post('/data/:day/removeItem', function(req, res) {
    const day = req.params.day;
    const data = req.body;
    let toRemove = {};
    toRemove[day] = data._id;

    Models.User.update({username: user1}, {$pull: toRemove}, err => {
        if(err) {
            res.status(500).send('could not remove');
        }
        else {
            res.send(toRemove);
        };
    });
})

// remove item from favoriteEXercises array
router.post('/data/favorites/remove', function(req, res) {
    const data = req.body;

    Models.User.update({username: user1}, {$pull: {favoriteExercises: data._id}}, err => {
        if(err) {
            res.status(500).send('could not remove');
        }
        else {
            res.send('removed!');
        };
    });
})

//POST new user route (optional, everyone has access)
// router.post('/newuser', auth.optional, (req, res, next) => {
//     const { body: { user } } = req;
//     console.log(user);

//     if (!user.username) {
//         return res.status(422).json({
//             errors: {
//                 username: 'is required',
//             },
//         });
//     }

//     if (!user.email) {
//         return res.status(422).json({
//             errors: {
//                 email: 'is required'
//             }
//         });
//     };

//     if (!user.password) {
//         return res.status(422).json({
//             errors: {
//                 password: 'is required',
//             },
//         });
//     }

//     //   const finalUser = new Users(user);

//     user.password.setPassword();

//     controller.newUser(user);

//     finalUser.setPassword(user.password);

//     return finalUser.save()
//         .then(() => res.json({ user: finalUser.toAuthJSON() }));
// });

// //POST login route (optional, everyone has access)
// router.post('/login', auth.optional, (req, res, next) => {
//     const { body: { user } } = req;

//     if (!user.username) {
//         return res.status(422).json({
//             errors: {
//                 username: 'is required',
//             },
//         });
//     }

//     if (!user.password) {
//         return res.status(422).json({
//             errors: {
//                 password: 'is required',
//             },
//         });
//     }

//     return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
//         if (err) {
//             return next(err);
//         }

//         if (passportUser) {
//             const user = passportUser;
//             user.token = passportUser.generateJWT();

//             return res.json({ user: user.toAuthJSON() });
//         }

//         return status(400).info;
//     })(req, res, next);
// });

// //GET current route (required, only authenticated users have access)
// router.get('/current', auth.required, (req, res, next) => {
//     const { payload: { id } } = req;

//     return Users.findById(id)
//         .then((user) => {
//             if (!user) {
//                 return res.sendStatus(400);
//             }

//             return res.json({ user: user.toAuthJSON() });
//         });
// });

module.exports = router;