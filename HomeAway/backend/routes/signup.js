const setSignUpController = require('../controller/setSignUpController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/setSignup/')
        .post(setSignUpController.signup)
}