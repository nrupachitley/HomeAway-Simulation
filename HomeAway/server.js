// server/app.js

/** require dependencies */
insertProfilePic =  require('./backend/controller/utils').insertProfilePic
insertPropertyPics = require('./backend/controller/setPropertyController').insertPropertyPics
const express = require("express")
const routes = require('./backend/routes')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser());
const multer = require('multer');
const router = express.Router()
var passport = require('passport');
app.use(passport.initialize());

let port = 5000 || process.env.PORT

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router)

app.use('/static', express.static('static'));

const storageProfileImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './static/profileImage');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const storagePropertyImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './static/propertyImages');
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else {
        cb(new Error('Accept only /png or /jpeg files'), false);
    }
}

const uploadSingle = multer({
    storage: storageProfileImage,
    fileFilter: fileFilter
});
const uploadMiltiple = multer({
    storage: storagePropertyImage,
    fileFilter: fileFilter
});

app.post('/uploadSingle', uploadSingle.single('profile_image'), (req, res) => {
    var userID = req.body.userID;
    console.log("files in uploadSingle", req. file);
    insertProfilePic(userID, req.file);
    res.end("image may have been updated");
  });

app.post('/uploadMultiple', uploadMiltiple.array('property_images'), (req, res) => {
    var propertyID = req.body.property_id;
    console.log("fils: ", req.files)
    insertPropertyPics(propertyID, req.files);
    res.end("Added Property Images");
});

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});