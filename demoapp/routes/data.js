var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Got a POST request')
});

router.post('/p', function(req, res){

	res.send('post');
});
module.exports = router;