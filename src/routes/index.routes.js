import express from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import bookingRouter from './booking.routes';
import { protect } from '../middleware/auth'

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', protect, userRouter);
router.use('/booking', protect, bookingRouter);

export default router;