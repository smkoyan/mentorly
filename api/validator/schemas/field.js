const Joi = require('joi');

module.exports = {
    'POST:/api/fields': {
        rules: {
            body: Joi.object().keys({
                name: Joi.string().required(),
            }),
        },

        auto: true,
    },
};
