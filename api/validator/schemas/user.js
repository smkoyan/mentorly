const Joi = require('joi');
const common = require('./common');

module.exports = {
    'PUT:/api/users': {
        rules: {
            body: Joi.object().keys({
                name: Joi.string(),

                surname: Joi.string(),

                type: Joi.string().valid('mentor', 'mentee'),

                position: Joi.string(),

                field: common.ObjectId,

                plans: Joi.string(),

                education: Joi.string(),

                experience: Joi.string(),

                about: Joi.string(),
            }),
        },

        auto: true,
    },
};
