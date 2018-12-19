var { Profiles } = require('../models/profile');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka get profile name and email backend");

    var id = msg.user_id;

    Profiles.findOne({
        id : id
    },function(err,profile){
        
        if(err || profile == null){
            callback(err, null);
        }
        else{
            console.log("getProfileImageandName = ", profile);
            var results = {person_id:id, name:profile.name, profile_image:profile.profileImage, email:profile.email}
            callback(null, results);
        }
    })
}

module.exports = {
    handle_request: handle_request
}
