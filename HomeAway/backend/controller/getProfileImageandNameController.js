var kafka = require('./kafka/client');

function getProfileImageandName(req, res){
    console.log("Inside Get Profile Image and Name Controller")
    console.log("GETPROFILEIMAGEANDNAME:" ,req.query);

    kafka.make_request('imageandname_request',req.query, function(err,results){
        console.log('in result');
        console.log(results);
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
    getProfileImageandName: getProfileImageandName
}