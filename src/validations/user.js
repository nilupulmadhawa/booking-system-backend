import { Joi } from 'celebrate'

export const registerSchema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profile_pic: Joi.string(),
}

export const loginSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
}

export const resetPasswordSchema = Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string().required()
})

export const userIdSchema = {
    id: Joi.string().required()
}