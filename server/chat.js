var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
  username: '4b7e9e47-b619-46ac-abf9-c9e72669867a',
  password: 'gczH7fC2ZH7q',
  version: 'v1',
  version_date: '2016-09-20'
});



exports.message = function(callback, message) {
    message.workspace_id = '61970c56-80d8-48eb-838b-6fdd890f85b6';
    conversation.message(message,  function(err, response) {
        if (err) {
            console.log('error:', err);
            callback({error: err});
        }
        else {
            callback(response);
        }
    });
}