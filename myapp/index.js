var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/user',function(req,res){
	res.send('Hi user');
})

app.listen(3000, function () {
  console.log('my app listening on port 3000!')
})