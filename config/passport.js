const Models = require('../models/dbModels');
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    function (username, password, done) {
        Models.User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { errors: { 'username': 'is invalid' } });
            }
            if (!user.validatePassword(password)) {
                return done(null, false, { errors: { 'password': 'is invalid' } });
            }
            return done(null, user);
        });
    }
));