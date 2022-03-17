const User = require('../models/user');
const Field = require('../models/field');

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

exports.show = async ctx => {
    try {
        const {id} = ctx.params;

        const user = await User.findById(
            id,
            'name surname field position plans education experience about',
        ).populate('field', 'name');

        if (user === null) {
            ctx.status = 404;
            ctx.body = {message: `User with id '${id}' not found`};
            return;
        }

        ctx.status = 200;
        ctx.body = user;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
    }
};

