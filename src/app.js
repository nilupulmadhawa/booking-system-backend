import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database';
import routes from './routes/index.routes';
import path from 'path';
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { errors } = require('celebrate');

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('https://documenter.getpostman.com/view/16708354/2s93CUHq4t'));

app.use('/api', routes);
app.use(errors())

app.use('/images', express.static(path.join(__dirname, '../public')));

connectDB();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Booking server successfully started on port ${port}`)
})
