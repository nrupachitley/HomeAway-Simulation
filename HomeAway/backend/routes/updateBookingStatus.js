const updateBookingStatusController = require('../controller/updateBookingStatusController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/updateBookingStatus/')
        .post(updateBookingStatusController.updateBookingStatus)
}