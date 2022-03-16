const Joi = require('joi');

module.exports = {
    ObjectId: Joi.string().length(24).alphanum(),

    email: Joi.string().email({ minDomainAtoms: 2 }),
};
