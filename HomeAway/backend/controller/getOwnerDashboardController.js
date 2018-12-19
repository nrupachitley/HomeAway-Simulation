var kafka = require('./kafka/client');

function getOwnerDashboard(req, res) {
    console.log("Inside Get Owner Dashboard Controller")
    console.log("GETOWNERDASHBOARD:", req.query)

    kafka.make_request('ownerdashboard_request',req.query, function(err,results){
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
    getOwnerDashboard: getOwnerDashboard
}