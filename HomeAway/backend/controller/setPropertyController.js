var kafka = require('./kafka/client');

function insertPropertyDetails(req, res) {
    console.log("Inside insert property controller")
    console.log("INSERTPROPERTYDETAILS: ", req.body);
    kafka.make_request('insertpropertydetails_request', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json(results);
            res.end();
        }
    });
}

function insertPropertyPics(propertyID, files) {
    console.log("Inside insert property pics controller")
    console.log("INSERTPROPERTYPICS: ", propertyID, files);

    var data = {propertyID:propertyID, files:files};
    kafka.make_request('insertpropertypics_request', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            return{
                status: "error",
                msg: "System Error, Try Again."
            }
        } else {
            console.log("Inside else");
            return results;
        }
    });

}

module.exports = {
    insertPropertyDetails: insertPropertyDetails,
    insertPropertyPics: insertPropertyPics
}