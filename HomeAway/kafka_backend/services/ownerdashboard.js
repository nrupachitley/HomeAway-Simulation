var { Properties } = require('../models/property');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka owner dashboard backend");

    var owner_id = msg.user_id;
    var start_date = null;
    var end_date = null;
    var property_headline = null;

    if (msg.start_date != null && msg.start_date != '') {
        start_date = new Date(msg.start_date)
    }

    if (msg.end_date != null && msg.end_date != '') {
        end_date = new Date(msg.end_date)
    }

    if (msg.property_name != null && msg.property_name != '') {
        property_headline = msg.property_name
    }

    const range = moment.range(start_date, end_date);
    console.log("range = ", range)

    Properties.find({ owner_id: owner_id }, function (err, output) {
        if (err) {
            callback(err, null)
        }
        else {
            // console.log("getOwnerDashboard: ", output);
            results = []
            for (var i = 0; i < output.length; i++) {
                for (var k = 0; k < output[i].booked.length; k++) {
                    var shouldFilter = false;
                    if (start_date && end_date && property_headline) {
                        shouldFilter = property_headline == output[i].headline && (range.contains(output[i].booked[k].start_date) && range.contains(output[i].booked[k].end_date))
                    }
                    else if (property_headline) {
                        shouldFilter = property_headline == output[i].headline
                    }
                    else {
                        shouldFilter = range.contains(output[i].booked[k].start_date) && range.contains(output[i].booked[k].end_date)
                    }
                    if (start_date || end_date || property_headline) {
                        if (shouldFilter) {
                            results.push(populateResult(output[i], output[i].booked[k]))
                        }
                    }
                    else {
                        results.push(populateResult(output[i], output[i].booked[k]))
                    }
                }
            }
            console.log("results: ", results)
            callback(null, results);
        }
    })
}

function populateResult(output, booked) {
    var dict = {}
    dict['booking_id'] = booked._id
    dict['id'] = output._id
    dict['location'] = output.location
    dict['headline'] = output.headline
    dict['booking_type'] = output.booking_type
    dict['property_type'] = output.property_type
    dict['bedrooms'] = output.bedrooms
    dict['bathrooms'] = output.bathrooms
    dict['accomodates'] = output.accomodates
    dict['price'] = output.price
    dict['status'] = booked.status
    dict['customer_name'] = booked.person_name
    dict['customer_email'] = booked.person_email
    var temp_start_date = JSON.stringify(booked.start_date).split('T');
    dict['start_date'] = (temp_start_date[0]).substr(1);
    var temp_end_date = JSON.stringify(booked.end_date).split('T');
    dict['end_date'] = (temp_end_date[0]).substr(1);
    var temp = output.images.split(',')
    for (var j = 0; j < temp.length; j++) {
        temp[j] = 'static/propertyImages/' + temp[j]
    }
    dict['images'] = temp[0];
    return dict
}

module.exports = {
    handle_request: handle_request
}