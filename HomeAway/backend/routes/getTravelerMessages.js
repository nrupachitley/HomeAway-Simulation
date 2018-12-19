const getTravelerMessagesController = require('../controller/getTravelerMessagesController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/getTravelerMessages/')
        .get(getTravelerMessagesController.getTravelerMessages)
}