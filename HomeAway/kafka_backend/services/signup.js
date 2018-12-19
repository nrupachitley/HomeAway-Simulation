var bcrypt = require('bcrypt');
var { Users } = require('../models/user');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var passport = require('passport');
require('../config/passport')(passport);
var config = require('../config/mongoose');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka sign up backend");

    var email = msg.values.Email;
    var password = msg.values.Password;

    Users.findOne({
        email: email
    }, function (err, user) {
        console.log("Result:", user, err)
        if (err) {
            console.log("Something Went Wrong ", e)
        }
        else if (user && user.length == 0 || user == null) {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) {
                    console.log("Error", err);
                    callback(err, null);
                }
                else {
                    var users = new Users({
                        email: msg.values.Email,
                        password: hash,
                        person_type: msg.person_type
                    });

                    users.save().then((user) => {
                        console.log("user: ", user)
                        var _id = user._id;
                        var token_user = {
                            email : email,
                            id: _id
                        }
                        var token = jwt.sign(token_user, config.secret, {
                            expiresIn: 10080 
                        });
                        // console.log(JSON.stringify({"id":_id}));
                        var final_token = { success: true, token: 'JWT ' + token, id : _id, email:email }
                        callback(null,final_token);
                    }, (err) => {
                        console.log(err, "Error Adding User");
                    });
                }
            })
        }
        else{
            callback(null,{success: false});
        }
    })
}

module.exports = {
    handle_request: handle_request
}