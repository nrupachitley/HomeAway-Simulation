// server/routes/index.js
const insertProperty = require('./setproperty')
const getProperty = require('./getProperty')
const setProfile = require('./setProfile')
const signup = require('./signup')
const signin = require('./signin')
const getProfileImg = require('./getProfileImgandName')
const getProfile = require('./getProfile')
const updateProfile = require('./updateProfile')
const setBooking = require('./setBooking')
const getTravelerDashboard = require('./getTravelerDashboard')
const getOwnerDashboard = require('./getOwnerDashboard')
const updateBookingStatus = require('./updateBookingStatus')
const getAllOwnerProperties = require('./getAllOwnerProperties')
const getTavelerMessages = require('./getTravelerMessages')
const sendMessage = require('./sendMessage') 
const getOwnerMessages = require('./getOwnerMessages')

module.exports = (router) => {
    insertProperty(router),
    getProperty(router),
    setProfile(router),
    signup(router),
    signin(router),
    getProfileImg(router),
    getProfile(router),
    updateProfile(router),
    setBooking(router),
    getTravelerDashboard(router),
    getOwnerDashboard(router),
    updateBookingStatus(router),
    getAllOwnerProperties(router),
    getTavelerMessages(router),
    sendMessage(router),
    getOwnerMessages(router)
}