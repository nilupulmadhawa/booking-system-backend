import Booking from '../models/booking'
import logger from '../utils/logger'

export const insertBooking = async (booking) => {
    const bookingMade = (await new Booking(booking).save()).toObject()
    return bookingMade
}

export const getAllBookings = async ({ sort = { created_at: -1 }, filter = {}, page, limit = 0 }) => {
    const booking = await Booking.find(filter).sort(sort).skip(page * limit).limit(limit).populate('user_id').lean()
    if (!booking) return null
    return booking
}

export const getOneBooking = async (filters) => {
    const booking = await Booking.findOne(filters).lean()
    if (!booking) return null
    return booking
}

export const findOneAndUpdateBooking = async (filters, data) => {
    const booking = await Booking.findOneAndUpdate(filters, data, { new: true }).lean()
    if (!booking) return null
    return booking
}

export const findOneAndRemoveBooking = async (filters) => {
    return await Booking.findOneAndRemove(filters)
}
