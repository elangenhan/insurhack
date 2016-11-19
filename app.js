var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');
var http = require('https');

var zapi = require('./server/zapi.js');
var mapi = require('./server/mapi.js');

var httpsoptions = {
   key  : null, //fs.readFileSync('server.key'),
   cert : null //fs.readFileSync('server.crt')
};

app.use(express.static('www'));

if(httpsoptions.key && httpsoptions.cert) {
    var https = require('https');
    https.createServer(options, app).listen(3000, function () {
        console.log('Started!');
    });
}
else {
    var http = require('http');
    http.createServer(app).listen(3000, function () {
        console.log('Started!');
    });
}