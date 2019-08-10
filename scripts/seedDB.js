const fs = require('fs');
const mongoose = require('mongoose');
const Models = require('./dbModels');
let exerciseData; // for storing data.txt into array

mongoose.connect('mongodb://localhost:27017/swolDB', {useNewUrlParser});

fs.readFile('data.txt', 'utf8', (err, data) => {
    if(err) throw err;

    // turn data.txt into an array
    exerciseData = data.split('\n').join(',').split(',');
    console.log(exerciseData);

    for(let i=0; i<exerciseData.length; i+=2) {
        // place array data into object for insertion into database
        let data = {
            name: exerciseData[i],
            muscle: exerciseData[i+1]
        };

        Models.Exercise.create(data)
            .then(dbExample => console.log(dbExample))
            .catch(err => console.log(err.message));
    };
});