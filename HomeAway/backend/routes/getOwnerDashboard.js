const getOwnerDashboardController = require('../controller/getOwnerDashboardController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/getOwnerDashboard/')
        .get(getOwnerDashboardController.getOwnerDashboard)
}