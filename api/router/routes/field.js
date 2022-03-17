const controller = require('../../controllers/field');
const authenticate = require('../../security/authentication');

module.exports = router => {
    router
        .post('/fields',
            authenticate,
            controller.store,
        );
};
