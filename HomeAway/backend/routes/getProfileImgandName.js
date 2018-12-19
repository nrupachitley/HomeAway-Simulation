const getProfileImageandNameController = require('../controller/getProfileImageandNameController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/getProfileImg/')
        .get(getProfileImageandNameController.getProfileImageandName)
}