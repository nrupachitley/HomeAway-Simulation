var kafka = require('./kafka/client');

function insertProfilePic(userID, file){
    console.log("Inside insert profile pic controller");
    console.log("INSERT PROFILE PIC: ", userID, file);
    var data = {userID:userID, file:file};
    kafka.make_request('insertprofilepic_request',data, function(err,res){
        console.log('in result');
        console.log(res);
        if (err){
            console.log("Inside err");
            return {
                status:"error",
                msg:"System Error, Try Again."
            }
        }else{
            console.log("Inside else");
            return res
        }
        
    });
}

module.exports = {
    insertProfilePic:insertProfilePic
}