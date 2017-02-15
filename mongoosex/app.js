var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('mpromise');
mongoose.Promise = global.Promise;

//book.model.js location
var port = 8080;
var db = 'mongodb://localhost/example';

var conn = mongoose.connect(db);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))
var Book = require('./book.model');

app.get('/', function (req, res) {
	res.send('happy to be here')
});

// Book.insertMany({
// 	title: 'Java',
// 	author: 'shu',
// 	category: 'tech'
// }).then(r => {
// 	console.log(r);
// })

app.get('/books', function (req, res) {
	console.log('getting all books');
	Book.find({})
		.then(books => {
			res.json(books);
			console.log(books);
		}
		);
});

app.get('/books/:id', function (req, res) {
	console.log('Getting single book');
	Book.findOne({
		_id: req.params.id
	})
		.exec((err, books) => {
			res.json(books);
			console.log(books);
		})
	// .then(books => {
	// 	res.json(books);
	// 	console.log(books);
	// });
});

//save book
app.post('/book', function (req, res) {
	var newBook = new Book();
	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.category = req.body.category;
	newBook.save(function (err, book) {
		if (err) {
			res.send('error saving book');
		} else {
			console.log(book);
			res.send(book);
		}
	})
});
//book-create
app.post('/book-create', function (req, res) {
	Book.create(req.body, function (err, book) {
		if (err) {
			res.send('Book create error');
		} else {
			res.send(book);
			console.log(book);
		}
	})
});

//findOneAndUpdate 
app.put('/book/:id', function (req, res) {
	Book.findOneAndUpdate({
		_id: req.params.id
	}, { $set: { title: req.body.title } },
		{ upsert: true },
		function (err, newBook) {
			if (err) {
				res.send('error occured');
			} else {
				console.log(newBook);
				res.send(newBook);
			}
		});
});

app.delete('/book/:id', function (req, res) {
	Book.findOneAndRemove({
		_id: req.params.id
	}, function (err, book) {
		if (err) {
			res.send('error delete');
		} else {
			console.log(book);
			res.send(book);
		}
	})
});
app.listen(port, function () {
	console.log('app listening on port ' + port);
});