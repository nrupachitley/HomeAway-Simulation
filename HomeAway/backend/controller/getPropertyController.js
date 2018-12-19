var kafka = require('./kafka/client');

function getPropertyDetails(req, res) {
    console.log("Inside Get Property Controller")
    console.log("GETPROPERTY:", req.query);
    kafka.make_request('getproperties_request',req.query, function(err,results){
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
    getPropertyDetails: getPropertyDetails
}