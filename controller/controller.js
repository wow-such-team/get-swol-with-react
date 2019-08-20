const db = require("../models/dbModels");

module.exports = {
    newUser: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    searchUser: function (req, res) {
        db.User
            .find({"username": req.params.username})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}