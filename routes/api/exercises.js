const router = require('express').Router();
const controller = require('../../controller/exerciseController');
const Models = require('../../models/dbModels');

// router.route('/all')
//     .get(controller.allExercises);

router.get('/all', function (req, res) {
    Models.Exercise.find(function (err, result) {
        res.send(result);
    });
});

module.exports = router;