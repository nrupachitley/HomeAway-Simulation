var { Properties } = require('../models/property');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka update booking status backend");
    var booking_id = msg.booking_id
    var property_id = msg.property_id

    Properties.updateOne({ '_id': property_id, 'booked._id': booking_id }, { $set: { 'booked.$.status': 'Confirm' } }, function (err, result) {
        if (err) {
            console.log("Something Went Wrong in updating booking status!", err);
            callback(err, null);
        }
        else {
            console.log("updateBookingStatus = ", result);
        }
    })
    callback(null, "Booking Updated!!");
}

module.exports = {
    handle_request: handle_request
}