var kafka = require('./kafka/client');

function getAllOwnerProperties(req, res) {
    console.log("Inside Get All Owner Properties Controller")
    console.log("GETALLOWNERPROPERTIES: ", req.query)

    kafka.make_request('allownerproperties_request',req.query, function(err,results){
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
    getAllOwnerProperties: getAllOwnerProperties
}