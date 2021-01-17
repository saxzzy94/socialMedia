const Joi = require('@hapi/joi')

module.exports = validate = function validateUser(user) {
    const schema = Joi.object({
        name:Joi.string().min(2).max(20).required(),
        email:Joi.string().min(5).max(200).required().email(),
        password:Joi.string().min(5).max(200).required(),
    });
    return schema.validate(user);
}