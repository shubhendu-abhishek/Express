let config = require('./config');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('mpromise');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var db = 'mongodb://localhost/company-feedback';
var conn = mongoose.connect(db, { useMongoClient: true });


//Compnay
let Company = require('./models/Company');
app.get('/', (req, res) => {
    res.send("Company-Feedback !!Welcome")
});

app.get('/find', function (req, res) {
    Company.find({}).then(result => {
        res.json(result);
    })
});
app.post('/insert', function (req, res) {
    Company.create(req.body).then(result => {
        res.json(result);
    })
});

//Feedback
let Feedback = require('./models/feedback');
app.get('/findFeedback', function (req, res) {
    Feedback.find({}).then(result => {
        res.json(result);
    })
});
app.post('/insertFeedback', function (req, res) {
    Feedback.create(req.body).then(result => {
        res.json(result);
    })
});

app.listen(config.port, () => {
    console.log("Application is running on the port :" + config.port);
})