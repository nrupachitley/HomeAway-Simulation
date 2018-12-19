var { Profiles } = require('../models/profile');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka set profile backend");

    var profiles = new Profiles({
        id: msg.user_id,
        name: msg.name,
        email: msg.email,
        phone_no: msg.phone_number,
        about_me: msg.about_me,
        city: msg.city,
        country: msg.country,
        company: msg.company,
        school: msg.school,
        hometown: msg.hometown,
        language: msg.language,
        gender: msg.gender,
    });

    profiles.save().then((profile) => {
        console.log("insertProfile = ", profile);
    },(err) =>{
        console.log("Error Occured While Entering Profile", err)
    })
    callback(null,"Profile Saved!!");
}

module.exports = {
    handle_request: handle_request
}