import express from 'express';
import { login, register } from '../controllers/auth';
import { celebrate, Segments } from 'celebrate'


import { registerSchema, loginSchema } from '../validations/user';
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

const authRouter = express.Router();

authRouter.post('/login', celebrate({ [Segments.BODY]: loginSchema }), login);
authRouter.post('/register', upload.single('profile_pic'), celebrate({ [Segments.BODY]: registerSchema }), register);

export default authRouter;