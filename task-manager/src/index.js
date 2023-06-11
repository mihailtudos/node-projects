import express from 'express';
import dotenv from 'dotenv';
import mongoose from './db/mongoose.mjs';
import usersRouter from './routers/user.js';
import tasksRouter from './routers/tasks.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
console.log(PORT);

const app = express();
app.use(express.json());

app.use([tasksRouter, usersRouter]);

app.listen(PORT, () => {
    console.info('Server running on port ' + PORT);
});
