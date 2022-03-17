const User = require('../models/user');
const Field = require('../models/field');

exports.update = async ctx => {
    const body = ctx.request.body;

    try {
        if ('field' in body) {
            const fieldExists = (await Field.count({_id: body.field})) > 0;

            if (!fieldExists) {
                ctx.status = 422;
                ctx.body = {message: 'Please provide valid field'};
                return;
            }
        }

        // as the user is already authenticated
        // and as this is not administrative endpoint
        // we are taking `user id` from `jwt` token
        await User.updateOne({_id: ctx.state.user.id}, body);

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

exports.index = async ctx => {
    try {
        const users = await User
            .find({}, 'name surname field position plans education experience about')
            .filter(ctx)
            .populate('field', 'name');

        ctx.status = 200;
        ctx.body = users;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
    }
};

