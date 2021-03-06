const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
};

//authentication middleware
// app.use()

// add routes, both API & view
app.use(routes);

// connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/swolDB', {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

app.listen(PORT, () => console.log('API server now on port ' + PORT + '!'));