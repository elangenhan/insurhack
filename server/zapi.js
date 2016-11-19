var https = require('https');
var jsonfile = require('jsonfile');

var url_gi = "https://api.insurhack.com/apis/gi/1";
var url_life = "https://api.insurhack.com/apis/life/1";
var options_gi = {
    hostname : "api.insurhack.com",
    path : "",
    grant_type : "password",
    headers : {
        Authorization : "Bearer ca125024-ea65-3588-b803-89b0a2f9c5fd"
    },
    method : "GET",
    json:true,
    port:443
};
var options_life = {
    hostname : "api.insurhack.com",
    path : "/apis/life/1"
};

var mofferings = {};

function get_mocked(file) {
    var data = jsonfile.readFileSync('./server/data/'+file);
    console.log();
    console.log("Using mocked data:");
    console.log(data);
    return data;
}
function get_object(d, mock_file) {
    try {
        return JSON.parse(d);
    } catch(e) {
        console.log(e);
        return get_mocked(mock_file);
    }
}
exports.get_policies = function(callback, id) {
    // https://api.insurhack.com/apis/gi/1/Account_Set('pc:1')?$expand=Policies($expand=BoundPeriods($expand=UNLine,GEBLine,RSLine,MSLine,HALine,HRLine))
    var mockfile = "policies.json";
    var path = "/apis/gi/1/Account_Set('" + id + "')?$expand=Policies($expand=BoundPeriods($expand=UNLine($expand=UNCosts,UNInsuredPersons($expand=UNNamedInsuredRole,CoverageParts($expand=Coverages))),GEBLine,RSLine,MSLine,HALine,HRLine))";

    var opt = options_gi;
    opt.path = path;

    var body = null;

    var req = https.request(options_gi, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
            if(!body)
                body = d;
            else
                body += d;
            
        }).on('end', function() {
            var obj = get_object(body, mockfile);
            callback(obj);
        });
    })
    req.end();
    req.on('error', (e) => {
        console.error(e);
        var data = get_mocked(mockfile);
        data.error = e;
        callback(data);
    });
}

exports.get_account = function(callback, id) {
    // /Account_Set('pc:1')?$expand=AccountHolderContact
    var mockfile = "account.json";
    var path = "/apis/gi/1/Account_Set('" + id + "')?$expand=AccountHolderContact($expand=PrimaryAddress)";

    var opt = options_gi;
    opt.path = path;
    var req = https.request(options_gi, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
            var data = get_object(d, mockfile);
            if(!data.AccountHolderContact.EmailAddress1 || !data.AccountHolderContact.PrimaryPhone || !data.AccountHolderContact.LastName
                || !data.AccountHolderContact.FirstName || !data.AccountHolderContact.DateOfBirth ||!data.AccountHolderContact.Gender
                || !data.AccountNumber || !data.AccountHolderContact.PrimaryAddress)
                return callback(get_mocked(mockfile));
            else
                callback(obj);
        });
    })
    req.end();
    req.on('error', (e) => {
        console.error(e);
        callback(e);
        var data = get_mocked(mockfile);
        data.error = e;
        callback(data);
    });
}
