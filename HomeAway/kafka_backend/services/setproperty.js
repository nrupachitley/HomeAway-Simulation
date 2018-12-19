var { Properties } = require('../models/property');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka set property backend");

    // var property_type_map = { 1: "Cottage", 2: "House", 3: "Campground", 4: "Hotel", 5: "Resort" };
    var booking_type_map = { 1: "Instant", 2: "24-Hour" };
    var location = [msg.address, msg.city, msg.state, msg.zip_code].join(",");
    var properties = new Properties({
        address: msg.address,
        city: msg.city,
        state: msg.state,
        zip_code: msg.zip_code,
        location: location,
        headline: msg.headline,
        property_description: msg.property_description,
        property_type: msg.property_type,
        bedrooms: msg.bedroom,
        bathrooms: msg.bathroom,
        accomodates: msg.accomodates,
        price: msg.price,
        aminities: msg.aminities,
        booking_type: booking_type_map[msg.booking_type],
        owner_id: msg.user_id
    })

    var dates = {
        start_date : msg.start_date || '',
        end_date : msg.end_date || ''
    }
    properties.not_available.push(dates)

    properties.save().then((property) => {
        console.log("Property Inserted : ", property);
        callback(null,{ "pid": property._id });
    }, (err) => {
        console.log("Error Inserting Property", err);
    })
}

module.exports = {
    handle_request: handle_request
}