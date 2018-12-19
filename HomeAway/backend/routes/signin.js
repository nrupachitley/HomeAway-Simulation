const setSignInController = require('../controller/setSignInController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/setSignin/')
        .post(setSignInController.signin)
}