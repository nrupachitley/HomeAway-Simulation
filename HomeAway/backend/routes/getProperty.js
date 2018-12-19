const getPropertyController = require('../controller/getPropertyController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/getProperty/')
        .get(getPropertyController.getPropertyDetails)
}