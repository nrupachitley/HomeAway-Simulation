var kafka = require('./kafka/client');

function insertProfile (req, res){
    console.log("Inside insert profile controller")
    console.log("INSERTPROFILE: ", req.body);
    kafka.make_request('setprofile_request',req.body, function(err,results){
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
    insertProfile: insertProfile,
}