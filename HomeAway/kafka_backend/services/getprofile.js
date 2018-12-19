var { Profiles } = require('../models/profile');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka get profile backend");

    var id = msg.user_id;

    Profiles.findOne({
        id : id
    },function(err,profile){
        if(err){
            callback(err, null)
        }
        else{
            console.log("Result: ", profile)
            callback(null, profile)
        }
    })
}

module.exports = {
    handle_request: handle_request
}