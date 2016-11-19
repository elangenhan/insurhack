var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');
var http = require('https');

var zapi = require('./server/zapi.js');
var mapi = require('./server/mapi.js');
var chat = require('./server/chat.js');

var httpsoptions = {
   key  : null, //fs.readFileSync('server.key'),
   cert : null //fs.readFileSync('server.crt')
};

app.use(express.static('www'));

app.post('/api/chat', function(req, res) {
    var input;
    var response = chat.message(function(response) {
        res.json(response);
    }, input);
});

/*
ablaufdatum, versicherungsdatum, zahlweise
{
    PolicyType:"",

}
*/
app.get('/api/policies', function(req, res) {
    zapi.get_policies(function(data) {
        res.json(data);
    }, 'pc:1');
});


/*
{
    Email:"",
    Phone:"",
    LastName:"",
    FirstName:"",
    DateOfBirth:"",
    Gender:"",
    InsuranceNumber:0,
    Address : {
        Street:"",
        StreetNumber:"",
        ZIP:"",
        City:"",
        Country:""
    }
}
*/
app.get('/api/account', function(req, res) {
    zapi.get_account(function(data) {
        var obj = {
            Email: data.EmailAddress1,
            Phone: data.PrimaryPhone,
            LastName: data.LastName,
            FirstName: data.FirstName,
            DateOfBirth: data.DateOfBirth,
            Gender: data.Gender,
            AccountNumber:AccountNumber,
            Address : data.PrimaryAddress
        }
        res.json(obj);
    }, 'pc:1');
});

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