var kafka = require('./kafka/client');

function signup(req, res) {
    console.log("Inside sign up controller")
    console.log("SIGNUP: ", req.body);
    kafka.make_request('signup_request',req.body, function(err,results){
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
    signup: signup
}
