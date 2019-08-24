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

router.post('/search', function(req, res) {
    const keyword = req.body.keyword;
    let musclegroup = req.body.musclegroup;
    let muscleQuery = {};

    if(musclegroup==="Muscle Groups") {
        musclegroup = "";
        muscleQuery["muscle"] = new RegExp(musclegroup, 'i');
    }
    else {
        muscleQuery["muscle"] = musclegroup;
    };

    // res.send(muscleQuery);

    Models.Exercise.find({$and: [{name: {$regex: keyword, $options: "i"}}, muscleQuery]})
    .then(results => {
        res.send(results);
    })
    .catch(err =>
        res.send(err));
})

router.get('/musclegroups', function(req, res) {
    Models.Exercise.find().distinct('muscle')
    .then(results => {
        res.send(results);
    });
})

module.exports = router;