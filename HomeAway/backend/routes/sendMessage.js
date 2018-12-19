const sendMessageController = require('../controller/sendMessageController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/sendMessages/')
        .post(sendMessageController.sendMessages)
}