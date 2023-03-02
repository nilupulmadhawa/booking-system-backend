import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import { createBooking, getBookings, getBookingByID, updateBookingdetails, deleteById, likeBooking } from '../services/booking'

export const create = asyncHandler(async (req, res) => {
    const result = await createBooking(req.body, req.user)
    if (!result) return makeResponse({ res, status: 500, message: 'Failed to add booking' })
    if (result.status) return makeResponse({ res, ...result })
    return makeResponse({ res, message: 'Booking added successfully' })
})

export const getAll = asyncHandler(async (req, res) => {
    try {
        const bookings = await getBookings(req.query)
        return makeResponse({ res, status: 200, data: bookings, message: 'Bookings retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getMyBooking = asyncHandler(async (req, res) => {
    try {
        req.query.filter = { "user_id": req.user._id }
        const bookings = await getBookings(req.query)
        return makeResponse({ res, status: 200, data: bookings, message: 'Bookings retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getById = asyncHandler(async (req, res) => {
    try {
        const ret = await getBookingByID(req.params.id)
        if (ret.status) return makeResponse({ res, ...ret })
        return makeResponse({ res, status: 200, data: ret, message: 'Booking retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const update = asyncHandler(async (req, res) => {
    try {
        const ret = await getBookingByID(req.params.id)
        if (ret.status) return makeResponse({ res, ...ret })
        if (!req.user.is_admin && req.body.confirmed) { delete req.body.confirmed }
        if (ret.user_id.toString() !== req.user._id.toString() && !req.user.is_admin) return makeResponse({ res, status: 401, message: 'Unauthorized' })
        const result = await updateBookingdetails(req.params.id, req.body)
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to update booking' })
        if (result.status) return makeResponse({ res, ...result })
        return makeResponse({ res, status: 200, data: result, message: 'Booking updated successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const remove = asyncHandler(async (req, res) => {
    try {
        const ret = await getBookingByID(req.params.id)
        if (ret.status) return makeResponse({ res, ...ret })
        if (ret.user_id.toString() !== req.user._id.toString() && !req.user.is_admin) return makeResponse({ res, status: 401, message: 'Unauthorized' })
        const result = await deleteById(req.params.id)
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to delete booking' })
        if (result.status) return makeResponse({ res, ...result })
        return makeResponse({ res, status: 200, data: result, message: 'Booking deleted successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const like = asyncHandler(async (req, res) => {
    try {
        const result = await likeBooking(req.params.id, req.user._id)
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to like booking' })
        if (result.status) return makeResponse({ res, ...result })
        return makeResponse({ res, status: 200, data: result, message: result.message })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})
