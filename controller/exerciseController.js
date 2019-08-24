const db = require('../models/dbModels');

module.exports = {
    allExercises: function(req, res) {
        db.Exercise
            .find()
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};