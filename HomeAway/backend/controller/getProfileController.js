var kafka = require('./kafka/client');

function getProfileDetails(req, res){
    console.log("Inside Get Profile Controller")
    console.log("GETPROFILEDETAILS:" ,req.body);
    kafka.make_request('getprofile_request',req.body, function(err,results){
        console.log('in result');
        console.log("getProfileDetails", results);
        console.log("getProfileDetails", err)
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            res.json(results);
            res.end();
            }
        
    });
}

module.exports = {
    getProfileDetails: getProfileDetails
}