const setBookingController = require('../controller/setBookingController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/setBooking/')
        .post(setBookingController.setBooking)
}