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

exports.index = async ctx => {
    try {
        const fields = await Field.find({}, 'name');

        ctx.status = 200;
        ctx.body = fields
    } catch (error) {
        console.error(error);
        ctx.status = 500;
    }
};
