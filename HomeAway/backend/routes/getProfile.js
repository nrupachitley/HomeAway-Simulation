const getProfileController = require('../controller/getProfileController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/getProfile/')
        .post(getProfileController.getProfileDetails)
}