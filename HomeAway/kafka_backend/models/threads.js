var mongoose = require('mongoose');

var Threads = mongoose.model('Threads',{
    user_id :{
        type : String
    },
    owner_id : {
        type : String
    },
    property_id :{
        type : String
    },
    property_headline :{
        type : String
    },
    messages :[{
            sent_by : {
                type: String
            },
           time : {
               type: Date
           },
           content: {
               type: String
           },
           // do not uses
           seen:{
               type: Boolean
           }
        }]
});

module.exports = {Threads};