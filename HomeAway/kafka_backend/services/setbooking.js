var { Properties } = require('../models/property');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka set booking backend");

    var bookingStatus;
    if (msg.booking_type === 'Instant') {
        bookingStatus = 'Confirm'
    }
    else {
        bookingStatus = 'Pending'
    }

    var book = {
        start_date: new Date(msg.start_date),
        end_date: new Date(msg.end_date),
        status: bookingStatus,
        person_id: msg.person_id,
        person_name: msg.person_name,
        person_email: msg.person_email
    }
    var dates = {
        start_date: msg.start_date,
        end_date: msg.end_date
    }

    Properties.updateOne(
        { _id: msg.p_id },
        {
            $push: { booked: book, not_available: dates }
        },
        function (err, output) {
            if (err) {
                console.log("Something Went Wrong!", err)
            }
            else {
                console.log("setBooking: ", output);
            }
        }
    )
    console.log("Booked successfully!!");
    callback(null,{ "status": 200 })
}

module.exports = {
    handle_request: handle_request
}