import express from 'express';
import dotenv from 'dotenv';
import mongoose from './db/mongoose.mjs';
import usersRouter from './routers/user.js';
import tasksRouter from './routers/tasks.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
console.log(PORT);

import multer from 'multer';
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
            return cb(new Error('Please upload a Word document.'));
        }

        cb(undefined, true);
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    console.log(req.upload);
    res.send();
});

app.use(express.json());
app.use([tasksRouter, usersRouter]);
app.listen(PORT, () => {
    console.info('Server running on port ' + PORT);
});
