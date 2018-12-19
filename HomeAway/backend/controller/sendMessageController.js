var kafka = require('./kafka/client');

function sendMessages(req, res) {
    console.log("Inside Send Messages Controller")
    console.log("SENDMESSAGES: ", req.body)

    kafka.make_request('sendmessages_request',req.body, function(err,results){
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
    sendMessages: sendMessages
}