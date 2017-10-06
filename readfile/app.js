var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var json2csv = require('json2csv');
var app = express();
const https = require('https');
var urls = [];

var fields = ['S.No', 'href'];
app.get('/scrape', function (req, res) {
    request.get('https://medium.com/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('a', 'div.site-main').each(function (index, aa) {
                let d = {
                    "S.No": index,
                    "href": aa.attribs.href
                };
                urls.push(d);
            });
            console.log("Total No of href :", urls.length);
            var jsonUrls = JSON.stringify(urls);
            try {
                let csv = json2csv({ data: urls, fields: fields });
                fs.writeFile('file.csv', jsonUrls, function (err) {
                    if (err) throw err;
                    console.log('file saved');
                });
            } catch (error) {
                console.log(error);
            }
        }
    });
});

app.listen('8081')
console.log('Magic happens on port 8081');