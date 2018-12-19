var mongoose = require('mongoose');

var Properties = mongoose.model('Property',{
    address : {
        type : String
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    zip_code : {
        type : String
    },
    location : {
        type : String
    },
    headline : {
        type : String
    },
    property_description :{
        type: String
    },
    property_type : {
        type : String
    },
    bedrooms : {
        type : Number
    },
    bathrooms : {
        type : Number
    },
    accomodates : {
        type : Number
    },
    price : {
        type: String
    },
    aminities : {
        type : String
    },
    booking_type : {
        type : String
    },
    images : {
        type : String
    },
    owner_id : {
        type : String
    },
    not_available : [{
        start_date : {
            type :  Date
        },
        end_date : {
            type: Date
        }
    }],
    booked : [{
        start_date : {
            type: Date
        },
        end_date : {
            type: Date
        },
        status : {
            type: String
        },
        person_id : {
            type : String
        },
        person_name : {
            type: String
        },
        person_email : {
            type : String
        }
    }]
});

module.exports = {Properties};