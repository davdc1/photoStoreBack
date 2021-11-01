const Joi = require('joi');

const ticketValSchema = Joi.object({
    name:Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    title: Joi.string(),
    date: Joi.string(),
    content:Joi.string(),
    status:Joi.string(),
    comment:Joi.string()
})

module.exports = ticketValSchema;