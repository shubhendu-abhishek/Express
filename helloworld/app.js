var express = require('express');
var path = require('path');
var routes = require('./routes');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('error-handler');


//load customer route
var customers = require('./routes/customers');
var app = express();
var connection = require('express-myconnection');
var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	connection(mysql,{
		host:'localhost',
		user:'root',
		password:'',
		port:3306,
		database:'nodejs'
	},'request')
	);

app.get('/',routes.index);
app.get('/customers',customers.list);
app.get('/customers/add',customers.add);
app.post('/customers/add',customers.save);
app.get('/customers/delete/:id',customers.delete_customer);
app.get('/customers/edit/:id',customers.edit);
app.post('/customers/edit/:id',customers.save_edit);
app.use(app.routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
