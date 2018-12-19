var kafka = require('./kafka/client');

function getTravelerDashboard(req, res) {
    console.log("Inside Traveler Dashboard Controller")
    console.log("GETTRAVELERDASHBOARD: ", req.query)

    kafka.make_request('travelerdashboard_request',req.query, function(err,results){
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
    getTravelerDashboard: getTravelerDashboard
}