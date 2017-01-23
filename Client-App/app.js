var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// ********* Neev ********* 
//neev = require('neev');

// Init neev database
//var mydb = neev.init_component('database', "/config/db.js");

// model : users
//var userModel = mydb.createModel("/models/user.js");

//transaction and rollback
//var db_transact = mydb.transaction();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: 1' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

app.post('/customer/add', function(req, res) {
	console.log("req.body",req.body);

    connection.query('CREATE TABLE people(id int primary key, name varchar(255), age int, address text)', function(err, result) {
  
        connection.query('INSERT INTO people (name, age, address) VALUES (?, ?, ?)', [req.body.name, req.body.age, req.body.address], function(err, result) {
            if (err) throw err
           res.send("Sucessful Inserted");
        })
    })

});

app.get('/customer/list',function(req, res){
	connection.query('SELECT * FROM people',function(err,peopleData){
		if(err) throw err;
		res.send(peopleData);
	})
});

//call from postman e.g: http://localhost:8080/customer/delete/1
app.delete('/customer/delete/:id',function(req,res){
	connection.query('DELETE FROM people WHERE id ='+req.params.id,function(err,removeData){
		if (err) throw err;
		res.send("delete Sucessful");
	});
});

app.put('/customer/update/:id',function(req,res){
	console.log("name",req.body.name,+": id",req.params.id)
	connection.query('UPDATE people SET name = ? WHERE id = ?',[req.body.name,req.params.id],function(err,updateData){
		if (err) throw err;
		res.send("Update Sucessful");
	})
});
// app.post('/user/add', function (req, res) {
//     userModel.insert({ name: req.body.name, age: req.body.age })
//         .then(doc => {
//             res.send({ status: 1 });
//         }
//         );
// });

// app.post('/user/list', function (req, res) {
//     userModel.find({})
//         .then(doc => {
//             res.send(doc);
//         }
//         );
// });

// app.post('/user/modify', function (req, res) {
//     userModel.find({}, function (e, r) {
//         if (e) throw e
//         else {
//             for (var i = 0; i < r.length; i++) {
//                 db_transact.add(r[i]);
//                 r[i].name = 'Kity';
//                 r[i].save();
//             }
//             res.send({ status: 1 });
//             setTimeout(function () {
//                 db_transact.rollback();
//             }, 10000);
//         }
//     });
// });

var port = process.env.PORT || 8080; // set our port

// START THE SERVER
app.listen(port);
