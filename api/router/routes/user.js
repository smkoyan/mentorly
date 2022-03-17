const controller = require('../../controllers/user');
const authenticate = require('../../security/authentication');

module.exports = router => {
    router
        .put('/users',
            authenticate,
            controller.update,
        );
};
