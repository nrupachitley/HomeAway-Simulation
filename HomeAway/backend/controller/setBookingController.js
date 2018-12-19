var kafka = require('./kafka/client');

function setBooking(req, res) {
    console.log("Inside set booking controller")
    console.log("SETBOOKING: ", req.body)

    kafka.make_request('setbooking_request',req.body, function(err,results){
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
    setBooking: setBooking
}