const getOwnerMessagesController = require('../controller/getOwnerMessagesController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/getOwnerMessages/')
        .get(getOwnerMessagesController.getOwnerMessages)
}