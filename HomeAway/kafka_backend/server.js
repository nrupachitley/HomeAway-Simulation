var connection =  new require('./kafka/Connection');
//topics files
var SignIn = require('./services/signin');
var ImageandName = require('./services/getprofileimgandname');
var GetProperties = require('./services/getproperties');
var TravelerDashboard = require('./services/travelerdashboard');
var OwnerDashbaord = require('./services/ownerdashboard');
var AllOwnerProperties = require('./services/allownerproperties');
var GetProfile = require('./services/getprofile');
var UpdateProfile = require('./services/updateprofile');
var SetProfile = require('./services/setprofile');
var SetBooking = require('./services/setbooking');
var UpdateBookingStatus = require('./services/updatebookingstatus');
var SignUp = require('./services/signup');
var InsertProfilePic = require('./services/utils');
var SetProperty = require('./services/setproperty');
var SetPropertyPics = require('./services/setpropertypics');
var SendMessages = require('./services/sendmessages');
var GetTravelerMessages = require('./services/gettravelermessages');
var GetOwnerMessages = require('./services/getownermessages');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signin_request",SignIn)
handleTopicRequest("imageandname_request",ImageandName)
handleTopicRequest("getproperties_request",GetProperties)
handleTopicRequest("travelerdashboard_request",TravelerDashboard)
handleTopicRequest("ownerdashboard_request",OwnerDashbaord)
handleTopicRequest("allownerproperties_request",AllOwnerProperties)
handleTopicRequest("getprofile_request",GetProfile)
handleTopicRequest("updateprofile_request",UpdateProfile)
handleTopicRequest("setprofile_request",SetProfile)
handleTopicRequest("setbooking_request",SetBooking)
handleTopicRequest("updatebookingstatus_request",UpdateBookingStatus)
handleTopicRequest("signup_request",SignUp)
handleTopicRequest("insertprofilepic_request",InsertProfilePic)
handleTopicRequest("insertpropertydetails_request",SetProperty)
handleTopicRequest("insertpropertypics_request",SetPropertyPics)
handleTopicRequest("sendmessages_request",SendMessages)
handleTopicRequest("travelermessages_request",GetTravelerMessages)
handleTopicRequest("ownermessages_request",GetOwnerMessages)
