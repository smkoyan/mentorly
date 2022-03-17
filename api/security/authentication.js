const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (ctx, next) => {
    let token = ctx.get('Authorization').trim();

    if (token === '') {
        token = ctx.query.token;
    }

    if (typeof token === 'undefined') {
        ctx.status = 401;
        ctx.body = {message: 'Token not found or has been expired'};
        return;
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, config.app.key);
    } catch (error) {
        ctx.status = 401;
        ctx.body = {message: 'Token not found or has been expired'};
        return;
    }

    ctx.state.user = {
        id: decoded.id,
        email: decoded.email,
    };

    await next();
};
