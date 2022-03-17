const User = require('../models/user');


exports.update = async ctx => {
    try {
        // as the user is already authenticated
        // and as this is not administrative endpoint
        // we are taking `user id` from `jwt` token
        await User.updateOne({_id: ctx.state.user.id}, ctx.request.body);

        ctx.status = 200;
        ctx.body = {message: 'User data successfully updated'};
    } catch (error) {
        console.error(error);
        ctx.status = 500;
    }
};

