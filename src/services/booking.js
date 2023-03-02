import { insertBooking, findOneAndUpdateBooking, findOneAndRemoveBooking, getOneBooking, getAllBookings } from '../repository/booking'

export const createBooking = async (data, user) => {
    if (data.confirmed) { delete data.confirmed }
    data = { ...data, user_id: user._id }
    return await insertBooking(data)
}

export const getBookings = async (query) => {
    try {
        return await getAllBookings(query)
    } catch (error) {
        return error;
    }
}

export const getBookingByID = async (id) => {
    try {
        const booking = await getOneBooking({ _id: id })
        if (!booking)
            return {
                status: 422,
                message: 'Booking not found'
            }
        return booking
    } catch (error) {
        return error;
    }
}

export const updateBookingdetails = async (bookingId, bookingDetails) => {
    try {
        const updatedBooking = await findOneAndUpdateBooking({ _id: bookingId }, bookingDetails)
        if (!updatedBooking)
            return {
                status: 422,
                message: 'Booking not found'
            }
        return updatedBooking
    } catch (error) {
        return error;
    }
}

export const deleteById = async (bookingId) => {
    try {
        const deleted = await findOneAndRemoveBooking({ _id: bookingId })
        if (!deleted)
            return {
                status: 422,
                message: 'Booking not found'
            }
        return {
            status: 200,
            message: 'deleted successfully'
        }
    } catch (error) {
        return error;
    }
}

export const likeBooking = async (bookingId, userId) => {
    try {
        const booking = await getOneBooking({ _id: bookingId })
        if (!booking.likes.some(p => p.toString() == userId.toString())) {
            await updateBookingdetails({ _id: bookingId }, { $push: { likes: userId } });
            return {
                status: 200,
                message: 'The booking has been liked'
            }
        } else {

            await updateBookingdetails({ _id: bookingId }, { $pull: { likes: userId } });
            return {
                status: 200,
                message: 'The booking has been disliked'
            }
        }
    } catch (err) {
        return err;
    }
}
