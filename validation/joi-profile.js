const Joi = require('@hapi/joi')

module.exports = validateProfile = (user) => {
    const schema = Joi.object({
        handle: Joi.string()
        .min(2)
        .max(40)
        .required(),

        status: Joi.string()
        .min(2)
        .max(40)
        .required(),

        skills: Joi
        .string()
        .required(),
    })
    return schema.validate(user);
}