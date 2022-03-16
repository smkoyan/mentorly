const controller = require('../../controllers/auth');

module.exports = router => {
    router
        .post('/signup',
            controller.signup,
        )
        .post('/signin',
            controller.signin,
        );
};
