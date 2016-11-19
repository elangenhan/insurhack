var url_gi = "https://api.insurhack.com/apis/gi/1";
var url_life = "https://api.insurhack.com/apis/life/1";

var mofferings = {};

exports.offerings = function(callback) {
    https.get(url_gi, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    }).on('error', (e) => {
        console.error(e);
        callback(mofferings);
    });
}