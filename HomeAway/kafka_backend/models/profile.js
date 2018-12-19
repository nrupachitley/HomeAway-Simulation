var mongoose = require('mongoose');

var Profiles = mongoose.model('Profiles',{
    id : {
        type : String
    },
    name : {
        type : String
    },
    email :{
        type : String
    },
    phone_no : {
        type : String
    },
    about_me :{
        type : String
    },
    city : {
        type : String
    },
    country : {
        type : String
    },
    company : {
        type : String
    },
    school : {
        type : String
    },
    hometown : {
        type : String
    },
    language : {
        type : String
    },
    gender : {
        type : String
    },
    profileImage : {
        type : String
    }
});

module.exports = {Profiles};