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
    Unfall:{},
    Rechtsschutz:{},
    Gebaeude:{},
    Hausrat:{},
    Haftpflicht:{},
    Mobilschutz:{}
}
*/

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
app.get('/api/policies', function(req, res) {
    zapi.get_policies(function(data) {
        var obj = {
            Unfall:{},
            Rechtsschutz:{},
            Gebaeude:{},
            Hausrat:{},
            Haftpflicht:{},
            Mobilschutz:{}
        }
        res.json(obj);
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
            Email: data.AccountHolderContact.EmailAddress1,
            Phone: data.AccountHolderContact.PrimaryPhone,
            LastName: data.AccountHolderContact.LastName,
            FirstName: data.AccountHolderContact.FirstName,
            DateOfBirth: data.AccountHolderContact.DateOfBirth,
            Gender: data.AccountHolderContact.Gender,
            AccountNumber: data.AccountNumber,
            Address : data.AccountHolderContact.PrimaryAddress
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