var { Profiles } = require('../models/profile');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka update profile backend");

    var id = msg.user_id;
    var name = msg.name;
    var email = msg.email;
    var phone_no = msg.phone_number;
    var about_me = msg.about_me;
    var city = msg.city;
    var country = msg.country;
    var company = msg.company;
    var school = msg.school;
    var hometown = msg.hometown;
    var language = msg.language;
    var gender = msg.gender;

    Profiles.updateOne(
            {id:id},
            { $set:
                {
                    name : name,
                    email:email,
                    phone_no:phone_no,
                    about_me:about_me,
                    city:city,
                    country:country,
                    company:company,
                    school:school,
                    hometown:hometown,
                    language:language,
                    gender:gender
                }
            },function(err, res){
        console.log("updateProfile = ", res, err);
    })
    callback(null,"Profile Updated!!");
}

module.exports = {
    handle_request: handle_request
}