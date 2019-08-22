require('dotenv').config();
// const passport = require('passport');
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