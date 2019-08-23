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

router.post('/:musclegroup/search', function(req, res) {
    const keyword = req.body.keyword;
    const musclegroup = req.params.musclegroup;

    Models.Exercise.find({$and: [{name: {$regex: keyword, $options: "i"}}, {muscle: musclegroup}]})
    .then(results => {
        res.send(results);
    });
})

router.get('/musclegroups', function(req, res) {
    Models.Exercise.find().distinct('muscle')
    .then(results => {
        res.send(results);
    });
})

module.exports = router;