var { Properties } = require('../models/property');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka tarveler dashboard backend");

    var user_id = msg.user_id;
    var start_date = null;
    var end_date = null;
    var property_headline = null;

    console.log("Start Date =", msg.start_date)
    console.log("End Date =", msg.end_date)
    console.log("Property Name =", msg.property_name)

    if (msg.start_date != null && msg.start_date != '') {
        start_date = new Date(msg.start_date)
    }

    if (msg.end_date != null && msg.end_date != '') {
        end_date = new Date(msg.end_date)
    }

    if (msg.property_name != null && msg.property_name != '') {
        property_headline = msg.property_name
    }

    console.log("Start Date =", start_date)
    console.log("End Date =", end_date)
    console.log("Property Name =", property_headline)

    Properties.find({ 'booked.person_id': user_id }, function (err, output) {
        if (err) {
            callback(err, null)
        }
        else {
            // console.log("getTravelerDashboard: ", output);
            const range = moment.range(start_date, end_date);
            results = []
            var count = 0
            for (var i = 0; i < output.length; i++) {
                // console.log("len: ", output[i].booked.length)
                for (var k = 0; k < output[i].booked.length; k++) {
                    // console.log("len: ", output[i].booked[k].start_date)
                    if (user_id === output[i].booked[k].person_id) {
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
                                var dict = {}
                                dict['count'] = count++;
                                dict['id'] = output[i]._id
                                dict['location'] = output[i].location
                                dict['headline'] = output[i].headline
                                dict['booking_type'] = output[i].booking_type
                                dict['property_type'] = output[i].property_type
                                dict['bedrooms'] = output[i].bedrooms
                                dict['bathrooms'] = output[i].bathrooms
                                dict['accomodates'] = output[i].accomodates
                                dict['price'] = output[i].price
                                dict['status'] = output[i].status
                                var temp_start_date = JSON.stringify(output[i].booked[k].start_date).split('T');
                                dict['start_date'] = (temp_start_date[0]).substr(1);
                                var temp_end_date = JSON.stringify(output[i].booked[k].end_date).split('T');
                                dict['end_date'] = (temp_end_date[0]).substr(1);
                                var temp = output[i].images.split(',')
                                for (var j = 0; j < temp.length; j++) {
                                    temp[j] = 'static/propertyImages/' + temp[j]
                                }
                                dict['images'] = temp[0];
                                results.push(dict)
                            }
                        }
                        else {
                            var dict = {}
                            dict['count'] = count++;
                            dict['id'] = output[i]._id
                            dict['location'] = output[i].location
                            dict['headline'] = output[i].headline
                            dict['booking_type'] = output[i].booking_type
                            dict['property_type'] = output[i].property_type
                            dict['bedrooms'] = output[i].bedrooms
                            dict['bathrooms'] = output[i].bathrooms
                            dict['accomodates'] = output[i].accomodates
                            dict['price'] = output[i].price
                            dict['status'] = output[i].status
                            var temp_start_date = JSON.stringify(output[i].booked[k].start_date).split('T');
                            dict['start_date'] = (temp_start_date[0]).substr(1);
                            var temp_end_date = JSON.stringify(output[i].booked[k].end_date).split('T');
                            dict['end_date'] = (temp_end_date[0]).substr(1);
                            var temp = output[i].images.split(',')
                            for (var j = 0; j < temp.length; j++) {
                                temp[j] = 'static/propertyImages/' + temp[j]
                            }
                            dict['images'] = temp[0];
                            results.push(dict)
                        }
                    }
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