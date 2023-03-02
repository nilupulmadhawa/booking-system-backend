import { Joi } from 'celebrate'

export const addBookingSchema = Joi.object({
    booking_data: Joi.date().required(),
    description: Joi.string().required(),
})

export const bookingViewSchema = {
    filter: Joi.object()
        .keys({
            created_at: Joi.string().hex().length(24).optional(),
            user_id: Joi.string().hex().length(24).optional(),
            updated_at: Joi.string().hex().length(24).optional()
        })
        .optional(),
    sort: Joi.object()
        .keys({
            created_at: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional(),
            updated_at: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional()
        })
        .optional(),
    page: Joi.number().optional(),
    limit: Joi.number().optional()
}

export const bookingIdSchema = {
    id: Joi.string().hex().length(24).required()
}