var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var conversation = watson.conversation({
  username: '4b7e9e47-b619-46ac-abf9-c9e72669867a',
  password: 'gczH7fC2ZH7q',
  version: 'v1',
  version_date: '2016-09-20'
});
app.use(bodyParser());

var zapi = require('./server/zapi.js');
var mapi = require('./server/mapi.js');
//var chat = require('./server/chat.js');

var httpsoptions = {
   key  : null, //fs.readFileSync('server.key'),
   cert : null //fs.readFileSync('server.crt')
};

app.use(express.static('www'));

app.post('/api/chat', function(req, res) {
    conversation.message({
      workspace_id: '61970c56-80d8-48eb-838b-6fdd890f85b6',
      input: {'text': message},
      context: req.body.context
    },  function(err, response) {
      if (err)
        console.log('error:', err);
      else
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
    });
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
        data.Policies.forEach(function(policy) {
            if(policy.BoundPeriods.length > 0) {
                policy.BoundPeriods.forEach(function(boundPeriod) {
                    var PolicyStartDate = boundPeriod.PolicyStartDate;
                    var PolicyNumber = boundPeriod.PolicyNumber;
                    var TermEndDate_ZDE = boundPeriod.TermEndDate_ZDE;
                    if(boundPeriod.UNLine) {
                        obj.Unfall.PolicyStartDate = PolicyStartDate;
                        obj.Unfall.PolicyNumber = PolicyNumber;
                        obj.Unfall.TermEndDate_ZDE = TermEndDate_ZDE;
                        obj.Unfall.Cost = {
                            ActualAmount : boundPeriod.UNLine.UNCosts[0].ActualAmount
                        }
                        obj.Unfall.InsuredPersons = boundPeriod.UNLine.UNInsuredPersons;
                    }
                    if(boundPeriod.RSLine) {
                        obj.Rechtsschutz.PolicyStartDate = PolicyStartDate;
                        obj.Rechtsschutz.PolicyNumber = PolicyNumber;
                        obj.Rechtsschutz.TermEndDate_ZDE = TermEndDate_ZDE;
                    }
                    if(boundPeriod.GEBLine) {
                        obj.Gebaeude.PolicyStartDate = PolicyStartDate;
                        obj.Gebaeude.PolicyNumber = PolicyNumber;
                        obj.Gebaeude.TermEndDate_ZDE = TermEndDate_ZDE;
                    }
                    if(boundPeriod.HRLine) {
                        obj.Hausrat.PolicyStartDate = PolicyStartDate;
                        obj.Hausrat.PolicyNumber = PolicyNumber;
                        obj.Hausrat.TermEndDate_ZDE = TermEndDate_ZDE;
                    }
                    if(boundPeriod.HALine) {
                        obj.Haftpflicht.PolicyStartDate = PolicyStartDate;
                        obj.Haftpflicht.PolicyNumber = PolicyNumber;
                        obj.Haftpflicht.TermEndDate_ZDE = TermEndDate_ZDE;
                    }
                    if(boundPeriod.MSLine) {
                        obj.Mobilschutz.PolicyStartDate = PolicyStartDate;
                        obj.Mobilschutz.PolicyNumber = PolicyNumber;
                        obj.Mobilschutz.TermEndDate_ZDE = TermEndDate_ZDE;
                    }
                });
            }
        });
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