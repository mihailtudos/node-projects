import express from 'express';
import dotenv from 'dotenv';
import mongoose from './db/mongoose.mjs';
import usersRouter from './routers/user.js';
import tasksRouter from './routers/tasks.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
console.log(PORT);

const app = express();
// maintenance mode middleware
app.use((req, res, next) => {
    res.status(503).send({
        error: "Application under maintenance, try back soon!"
    });
});

app.use(express.json());

app.use([tasksRouter, usersRouter]);

app.listen(PORT, () => {
    console.info('Server running on port ' + PORT);
});

// import jwt from 'jsonwebtoken';

// async function myFync() {
//     const token = jwt.sign({_id: '1231sadsa12'}, 'secret', {expiresIn: '7 days'});
//     console.log(token);
//     console.log(jwt.verify(token, 'secret'));
// }

// myFync();