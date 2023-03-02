import express from 'express';
import { create, getAll, getMyBooking, getById, remove, update, like } from '../controllers/booking';
import { adminProtect } from '../middleware/auth'
import { celebrate, Segments } from 'celebrate'


import { addBookingSchema, bookingViewSchema, bookingIdSchema } from '../validations/booking';

const bookingRouter = express.Router();

bookingRouter.post('/', celebrate({ [Segments.BODY]: addBookingSchema }), create);
bookingRouter.get('/', celebrate({ [Segments.QUERY]: bookingViewSchema }), adminProtect, getAll);
bookingRouter.get('/my', celebrate({ [Segments.QUERY]: bookingViewSchema }), getMyBooking);
bookingRouter.get('/:id', celebrate({ [Segments.PARAMS]: bookingIdSchema }), getById);
bookingRouter.patch('/:id', celebrate({ [Segments.PARAMS]: bookingIdSchema }), update);
bookingRouter.delete('/:id', celebrate({ [Segments.PARAMS]: bookingIdSchema }), remove);

export default bookingRouter;