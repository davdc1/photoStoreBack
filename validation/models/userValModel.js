const Joi = require('joi');

const userValSchema = Joi.object({
    name: {
        firstName:Joi.string(),
        lastName:Joi.string(),
    },
    email:Joi.string(),
    password:Joi.string(),
    authorization:Joi.string(),
    phone:Joi.string(),
    cart:Joi.array(),
    orders:Joi.array(),
})

module.exports = userValSchema;