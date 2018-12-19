var kafka = require('./kafka/client');

function updateBookingStatus(req, res){
    console.log("Inside update booking controller")
    console.log("UPDATEBOOKINGSTATUS: ", req.body)
    kafka.make_request('updatebookingstatus_request',req.body, function(err,results){
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
    updateBookingStatus: updateBookingStatus
}