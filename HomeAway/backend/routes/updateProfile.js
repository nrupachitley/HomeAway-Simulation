const updateProfileController = require('../controller/updateProfileController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/updateProfile/')
        .post(updateProfileController.updateProfile)
}