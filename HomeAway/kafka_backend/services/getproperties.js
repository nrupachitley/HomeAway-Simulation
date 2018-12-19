var { Properties } = require('../models/property');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka get properties backend");

    var place = ''
    var accomodates = 0
    var price = Number.MAX_SAFE_INTEGER
    var bedrooms = 0

    if (msg.city != null && msg.city != '') {
        place = msg.city;
    }

    if (msg.accomodates != null && msg.accomodates != '') {
        accomodates = parseInt(msg.accomodates)
    }

    if (msg.price != null && msg.price != '') {
        price = parseInt(msg.price)
    }

    if (msg.bedrooms != null && msg.bedrooms != '') {
        bedrooms = parseInt(msg.bedrooms)
    }

    var start_date = new Date(msg.start_date);
    var end_date = new Date(msg.end_date);
    console.log("Bedrooms = ", bedrooms, typeof (bedrooms))
    console.log("Place = ", place)
    console.log("Accomodates = ", accomodates)
    console.log("Price = ", price, typeof (price))
    console.log("start date = ", start_date)
    console.log("end date = ", end_date)

    Properties.find({
        city: place,
        accomodates: { $gte: accomodates },
        bedrooms: { $gte: bedrooms },
    }, function (err, output) {
        console.log("getPropertyDetails = ", output, err);
        if (err) {
            callback(err, null)
        }
        else {
            results = []
            for (var i = 0; i < output.length; i++) {
                var flag = true
                if (msg.start_date != null && msg.end_date != null) {
                    var dates = output[i].not_available
                    var property_price_string = output[i].price.split(' ')
                    var property_price_int = parseInt(property_price_string[1])
                    console.log("price = ", property_price_int, typeof (property_price_int))
                    // console.log("price comparison =", property_price_int <= price)
                    for (var j = 0; j < dates.length; j++) {
                        if (dates[i] != null) {
                            const range = moment.range(dates[j].start_date, dates[j].end_date);
                            if (range.contains(start_date) || range.contains(end_date)) {
                                flag = false
                                console.log("flag: ", flag)
                            }
                        }
                    }
                    if (property_price_int >= price) {
                        flag = false
                    }
                }
                if (flag === true) {
                    var dict = {}
                    dict['p_id'] = output[i]._id.toString()
                    dict['owner_id'] = output[i].owner_id;
                    dict['location'] = output[i].location
                    dict['headline'] = output[i].headline
                    dict['property_description'] = output[i].property_description
                    dict['booking_type'] = output[i].booking_type
                    dict['property_type'] = output[i].property_type
                    dict['bedrooms'] = output[i].bedrooms
                    dict['bathrooms'] = output[i].bathrooms
                    dict['accomodates'] = output[i].accomodates
                    dict['price'] = output[i].price
                    dict['aminities'] = output[i].aminities
                    var temp = output[i].images.split(',')
                    for (var j = 0; j < temp.length; j++) {
                        temp[j] = 'static/propertyImages/' + temp[j]
                    }
                    dict['images'] = temp;
                    results.push(dict)
                }
            }
            console.log("results: ", results)
            callback(null, results)
        }
    })
}

module.exports = {
    handle_request: handle_request
}