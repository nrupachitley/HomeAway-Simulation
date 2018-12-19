var kafka = require('./kafka/client');

function updateProfile(req, res){
    console.log("Inside update profile controller")
    console.log("UPDATEPROFILE: ", req.body);

    kafka.make_request('updateprofile_request',req.body, function(err,results){
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
    updateProfile: updateProfile,
 
}