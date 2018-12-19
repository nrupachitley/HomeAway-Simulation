const setProfileController = require('../controller/setProfileController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/setProfile/')
        .post(setProfileController.insertProfile)
}