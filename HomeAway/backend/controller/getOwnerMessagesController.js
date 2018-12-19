var kafka = require('./kafka/client');

function getOwnerMessages(req, res) {
    console.log("Inside Owner Messages Controller")
    console.log("GETOWNERMESSAGES: ", req.query)

    kafka.make_request('ownermessages_request',req.query, function(err,results){
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
    getOwnerMessages: getOwnerMessages
}