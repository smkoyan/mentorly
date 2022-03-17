const Field = require('../models/field');

exports.store = async ctx => {
    try {
        const field = await Field.create(ctx.request.body);

        ctx.status = 201;
        ctx.body = {
            id: field._id,
        }
    } catch (error) {
        console.error(error);
        ctx.status = 500;
    }
};

