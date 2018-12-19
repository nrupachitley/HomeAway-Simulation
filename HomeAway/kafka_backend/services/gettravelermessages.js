var { Threads } = require('../models/threads');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka tarveler message backend");

    var user_id = msg.user_id;

    Threads.find({ 'user_id': user_id }, function (err, output) {
        if (err) {
            callback(err, null)
        }
        else {
            console.log("getTravelerMessages: ", output);

        }
        console.log("results: ", output)
        callback(null, output)
    })
}

module.exports = {
    handle_request: handle_request
}