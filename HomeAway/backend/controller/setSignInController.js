var kafka = require('./kafka/client');

function signin(req, res) {
    console.log("Inside sign in controller");
    console.log("SIGNIN: ", req.body);
    kafka.make_request('signin_request',req.body, function(err,results){
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
    signin: signin
}
