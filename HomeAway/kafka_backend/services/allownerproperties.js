var { Properties } = require('../models/property');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka get all properties backend");

    var owner_id = msg.user_id;

    Properties.find({ owner_id: owner_id }, function (err, result) {
        if (err) {
            callback(err, null)
        }
        else {
            console.log("getOwnerProperties: ", result)
            output = []
            for (var i = 0; i < result.length; i++) {
                var dict = {}
                dict['id'] = result[i]._id
                dict['headline'] = result[i].headline
                dict['location'] = result[i].location
                if (result[i].images && result[i].images.length > 0 ) {
                    var all_images = (result[i].images).split(',')
                    dict['image'] = 'static/propertyImages/' + all_images[0]    
                } else {
                    dict['image'] = null
                }
                output.push(dict)
            }
            console.log("output: ", output)
            callback(null, output)
        }
    })
}

module.exports = {
    handle_request: handle_request
}