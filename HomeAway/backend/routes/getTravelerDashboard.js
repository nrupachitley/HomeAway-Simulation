const getTravelerDashboardController = require('../controller/getTravelerDashboardController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/getTravelerDashboard/')
        .get(getTravelerDashboardController.getTravelerDashboard)
}