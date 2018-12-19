var { Threads } = require('../models/threads');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka send messages backend");

    var user_id = msg.user_id;
    var owner_id = msg.owner_id;
    var property_id = msg.property_id;
    var property_headline = msg.property_headline;
    var user_name = msg.user_name;
    var message = msg.message;
    var time_now = new Date()

    var threads = new Threads({
        user_id : user_id,
        owner_id : owner_id,
        property_id : property_id,
        property_headline : property_headline
    })

    var message = {
        sent_by : user_name,
        time : time_now,
        content: message,
        seen: false
    }

    threads.messages.push(message)

    Threads.findOne({
        user_id : user_id,
        property_id : property_id,
    },function(err, output){
        if(err){
            console.log("Something went wrong!")
        }
        else{
            if(output && output.length == 0 || output == null){
                console.log("OUTPUT = ", output)
                threads.save().then(() => {
                    console.log("Message Inserted ");
                    callback(null,"OK");
                }, (err) => {
                    console.log("Error Inserting Property", err);
                })
            }
            else{
                Threads.updateOne(
                    {user_id : user_id, property_id : property_id},
                    {
                        $push: { messages: message }
                    },function(err, out){
                        if(err){
                            console.log("Something went wrong in updating!")
                        }
                        else{
                            console.log("Update complete!", out)
                        }
                    }
                )
            }
        }
    })
    
}

module.exports = {
    handle_request: handle_request
}