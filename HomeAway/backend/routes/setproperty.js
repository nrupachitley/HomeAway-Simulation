const setpropertyController = require('../controller/setPropertyController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/insertProperty/')
        .post(setpropertyController.insertPropertyDetails)
}