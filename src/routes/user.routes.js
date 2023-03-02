import express from 'express';
import { getAll, getById, remove, update, changePassword } from '../controllers/user';
import { userProtect, adminProtect } from '../middleware/auth'
import { celebrate, Segments } from 'celebrate'

import { userIdSchema, resetPasswordSchema } from '../validations/user';
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        req.body.profile_pic = uniqueSuffix + file.originalname
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

const userRouter = express.Router();

userRouter.get('/', adminProtect, getAll);
userRouter.get('/:id', adminProtect, getById);
userRouter.patch('/:id', upload.single('profile_pic'), celebrate({ [Segments.PARAMS]: userIdSchema }), userProtect, update);
userRouter.delete('/:id', userProtect, remove);
userRouter.put('/password', celebrate({ [Segments.BODY]: resetPasswordSchema }), changePassword);

export default userRouter;