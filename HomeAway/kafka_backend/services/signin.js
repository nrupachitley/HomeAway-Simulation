var { Users } = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var passport = require('passport');
require('../config/passport')(passport);
var config = require('../config/mongoose');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka sign in backend");

    if (msg.values) {
        var email = msg.values.Email;
    }
    Users.findOne({
        email: email
    }, function (err, user) {
        if (err) {
            callback(err, null);
        }
        else if (user == null) {
            callback(null, { "result": "Wrong Email" });
        }
        else if (user.person_type != msg.person_type) {
            callback(null, { "result": "Invalid " + msg.person_type + " login!" });
        }
        else {
            var email = user.email;
            var password = user.password;
            var id = user._id;
            bcrypt.compare(msg.values.Password, password, function (err, result) {
                if (result == false) {
                    callback(null, { "result": "Wrong Password" });
                }
                else {
                    var token_user = {
                        email: email,
                        id: id
                    }
                    var token = jwt.sign(token_user, config.secret, {
                        expiresIn: 10080
                    });
                    callback(null, { success: true, token: 'JWT ' + token, id: id });
                }
            })
        }
    })
}

module.exports = {
    handle_request: handle_request
}