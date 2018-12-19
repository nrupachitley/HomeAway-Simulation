const getAllOwnerPropertiesController = require('../controller/getAllOwnerPropertiesController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/getAllOwnerProperties/')
        .get(getAllOwnerPropertiesController.getAllOwnerProperties)
}