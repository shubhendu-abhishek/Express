var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
const https = require('https');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var htmlparser = require("htmlparser2");
var getElement = require('get-element');
var urls = [];
var document = require('html-element').document;
app.get('/scrape', function (req, res) {
    request.get('https://medium.com/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('a', 'div.site-main').each(function (index, aa) {
                urls.push(aa.attribs.href);

            });
            console.log(urls);
            console.log(urls.length);
        }
    });
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;