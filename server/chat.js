exports.message = function(callback, message) {
    response = {
        output : {
            text : "Hello"
        }
    };
    callback(response);
}