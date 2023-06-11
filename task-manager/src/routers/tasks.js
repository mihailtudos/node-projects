import express from 'express';
import { Task } from '../models/task.js';

const router = new express.Router();

router.post('/api/v1/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        const newTask = await task.save();
        return res.send({code: 201, task: newTask });
    } catch(err) {
        return res.status(400).send({error: err.message})
    }
});

router.get('/api/v1/tasks', async (req, res) => {
    try {
        const task = await Task.find({});
        return res.send({code: 200, task});
    } catch(err) {
        return res.status(400).send({error: err.message})
    }
});

router.get('/api/v1/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({error: "Task not found."})
        }

        return res.send({code: 200, task});
    } catch(err) {
        return res.status(400).send({error: err.message})
    }
});

router.patch('/api/v1/tasks/:id', async (req, res) => {
    if (!req.params.id || !req.body) {
        return res.status(500).send({error: "Invalid request"});
    }

    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid updates!"});
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send({error: 'Task not found'});
        }

        return res.send(task);
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
});

router.delete('/api/v1/tasks/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(500).send({error: "No id provided"});
    }

    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({error: "Task not found."})
        }

        return res.send({code: 200, task});
    } catch(err) {
        return res.status(400).send({error: err.message})
    }
});


export default router;