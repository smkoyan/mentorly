const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async ctx => {
    try {
        let user = ctx.request.body;

        console.log(user);

        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
        user = await User.create(user);

        ctx.status = 201;
        ctx.body = {
            id: user._id,
        };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
    }
};
