const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Load models
const Todo = require('./api/models/TodoModel');

// For more info and options visit: http://mongoosejs.com/docs/connections.html#options
const mongooseOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500
};

// DB connection data
const dbUrl = 'localhost';
const dbPort = '27017';
const dbName = 'todos_db';

// Set mongoose Promise library
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://' + dbUrl + ':' + dbPort + '/' + dbName, mongooseOptions).then(
    () => {
        // mongoose.connect() promise resolves to undefined
        console.log('Ready to use');
    },
    err => {
        console.log('Not possible to connect to DB\n\n', + err);
    }
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Load routes into app
let routes = require('./api/routes/todoRoutes');
routes(app);

app.listen(port);

console.log('It is working! Server is listening on ' + port);