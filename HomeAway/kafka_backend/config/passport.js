var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var config = require('./mongoose');
var { Users } = require('../models/user');

module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        Users.findOne({email: jwt_payload.email}, function (err, user) {
            if(err){
                return done(err, false)
            }
            if(user){
                done(null, user)
            }
            else{
                done(null, false)
            }
        });
    }));
};
