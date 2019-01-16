var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var config = require('./config/database');

// Connect to db
/* mongoose.connect(config.database, config.options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
}); */

//Init App
var app = express();

// Prettify JSON
app.set('json spaces', 40);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// Add Headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
/* app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*"); // "http://localhost:4200"

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
}); */



// Set Routes
var domains = require('./routes/domains.js');
app.use('/api/domains', domains);

var events = require('./routes/events.js');
app.use('/api/events', events);

var users = require('./routes/users.js');
app.use('/api/users', users);

var memberships = require('./routes/memberships.js');
app.use('/api/memberships', memberships);

// Start the server
var port = 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});