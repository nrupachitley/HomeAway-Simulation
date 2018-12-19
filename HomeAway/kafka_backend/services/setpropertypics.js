var { Properties } = require('../models/property');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka set property pics backend");

    var files =  msg.files;
    var propertyID = msg.propertyID;
    var fileName = "";
    for(var i = 0; i < files.length; i++){
        fileName = fileName + files[i]['filename'] + ",";
    }
    fileName = fileName.slice(0, -1);
    Properties.updateOne({_id : propertyID},{ $set : {images : fileName} }, function(err, res){
        console.log("insertPropertyPics = ", res, err);
        callback(null,res)
    })
}

module.exports = {
    handle_request: handle_request
}