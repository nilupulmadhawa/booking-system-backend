import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const BookingSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        booking_data: {
            type: Date,
            required: true
        },
        confirmed: {
            type: Boolean,
            required: true,
            default: false
        },
        description: {
            type: String,
            required: false
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

BookingSchema.plugin(aggregatePaginate)

BookingSchema.index({ createdAt: 1 })

const Booking = mongoose.model('Booking', BookingSchema)
Booking.syncIndexes()

export default Booking
