var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
var bodyParser = require('body-parser');
var fs = require('fs');

var port = 8080;

var app = express();
var s3 = new aws.S3({
    secretAccessKey: '',
    accessKeyId: ''
});

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser({ limit: '100mb' }));

var upload = multer({
    storage: multerS3({
        s3: s3,
        limits: {
            files: 1,
            fileSize: 512000
        },
        ACL: 'private',
        bucket: '',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        // metadata: function(req, file, cb) {
        //     console.log('fieldName', file.mimetype)
        //     cb(null, { fieldName: file.fieldname, contentType: file.mimetype });
        // },
        key: function(req, file, cb) {
            var a = file.originalname.lastIndexOf('.');
            console.log("file.fieldname", file)
            cb(null, Date.now().toString() + file.originalname.substring(a, file.originalname.length));
        },
    })
});


app.post('/upload', upload.single('file'), function(req, res, next) {
    console.log("res", res);
   
    res.end('finished');
});


app.use(function(err, req, res, next) {
    console.log('ERROR', err);
    res.status(500);
    res.end('');
    console.error(err.stack);
});

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

