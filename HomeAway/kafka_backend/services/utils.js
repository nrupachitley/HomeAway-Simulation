var { Profiles } = require('../models/profile');

function handle_request(msg, callback) {
    console.log("Profile Img:" + JSON.stringify(msg));
    console.log("Inside kafka insert profile pic backend");

    var fileName = msg.file.originalname;
    var userID = msg.userID;
    Profiles.updateOne({id:userID}, { $set: {profileImage:fileName}}, function (err,res) {
        console.log("insertProfilePIC = ", res, err);
        callback(null, res)
    })
}

module.exports = {
    handle_request: handle_request
}