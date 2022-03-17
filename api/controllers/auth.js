const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Field = require('../models/field');
const config = require('../config');

exports.signup = async ctx => {
    try {
        let user = ctx.request.body;

        const emailExists = (await User.count({email: user.email})) > 0;

        if (emailExists) {
            ctx.status = 409;
            ctx.body = {message: `User with ${user.email} already exists`};
            return;
        }

        const fieldExists = (await Field.count({_id: user.field})) > 0;

        if (!fieldExists) {
            ctx.status = 422;
            ctx.body = {message: 'Please provide valid field'};
            return;
        }

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

exports.signin = async ctx => {
    try {
        const email = ctx.request.body.email;
        const user = await User.findOne({ email: email }, 'password');

        if (user === null) {
            ctx.status = 400;
            ctx.body = {
                message: 'Wrong email or password',
            };
            return;
        }

        const password = ctx.request.body.password;

        if (! (await bcrypt.compare(password, user.password))) {
            ctx.status = 400;
            ctx.body = {
                message: 'Wrong email or password',
            };
            return;
        }

        // to make the logic of token signing reusable and clear
        // controller action code we can extract this logic
        // to it's dedicated `manager` (auth manager)
        // also environment variables may be taken from `config`
        const token = jwt.sign({
            id: user._id,
            email,
        }, config.app.key, {
            expiresIn: config.jwt.expiresIn,
        });

        ctx.body = {
            success: true,
            token,
        };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
    }
};
