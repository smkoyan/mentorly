const Joi = require('joi');
const common = require('./common');

module.exports = {
    'POST:/api/signup': {
        rules: {
            body: Joi.object().keys({
                name: Joi.string().required(),

                surname: Joi.string().required(),

                type: Joi.string().valid('mentor', 'mentee'),

                position: Joi.string().required(),

                field: common.ObjectId.required(),

                plans: Joi.string().required(),

                education: Joi.string(),

                experience: Joi.string(),

                about: Joi.string(),

                email: common.email.required(),

                password: Joi.string().required(),

                // passwordConfirmation: Joi.any().equal(Joi.ref('password')).required(),
            }),
        },

        auto: true,
    },
};
