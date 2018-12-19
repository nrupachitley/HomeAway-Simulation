var { Threads } = require('../models/threads');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka owner message backend");

    var owner_id = msg.owner_id;

    Threads.find({ 'owner_id': owner_id }, function (err, output) {
        if (err) {
            callback(err, null)
        }
        else {
            console.log("getOwnerMessages: ", output);
            results = {}
            for (var i = 0; i < output.length; i++) {
                if (output[i].property_id in results) {
                    var messages_list = results[output[i].property_id]['messages']
                    var new_user_dict = {}
                    new_user_dict[output[i].user_id] = []
                    for (var j = 0; j < output[i].messages.length; j++) {
                        var new_conversation = {}
                        new_conversation['sent_by'] = output[i].messages[j].sent_by
                        new_conversation['time'] = output[i].messages[j].time
                        new_conversation['content'] = output[i].messages[j].content
                        new_user_dict[output[i].user_id].push(new_conversation)
                    }
                    messages_list.push(new_user_dict)
                }
                else {
                    results[output[i].property_id] = {}
                    results[output[i].property_id]['property_id'] = output[i].property_id
                    results[output[i].property_id]['property_headline'] = output[i].property_headline
                    results[output[i].property_id]['owner_id'] = output[i].owner_id
                    results[output[i].property_id]['messages'] = []
                    results[output[i].property_id]['messages'].push({})
                    var last_dict = results[output[i].property_id]['messages'].pop()
                    last_dict[output[i].user_id] = []
                    for (var j = 0; j < output[i].messages.length; j++) {
                        var temp = {}
                        temp['sent_by'] = output[i].messages[j].sent_by
                        temp['time'] = output[i].messages[j].time
                        temp['content'] = output[i].messages[j].content
                        last_dict[output[i].user_id].push(temp)
                    }
                    results[output[i].property_id]['messages'].push(last_dict)
                }
            }

        }
        console.log("results: ", results)
        callback(null, results)
    })
}

module.exports = {
    handle_request: handle_request
}