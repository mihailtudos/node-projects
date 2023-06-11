import express from 'express';
import { User } from '../models/user.js';

const router = new express.Router();

router.post('/api/v1/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();

        return res.status(201).send({ user, token });
    } catch(err) {
        return res.status(400).send({error: err.message})
    }
});

router.get('/api/v1/users', async (req, res) => {
    try {
        const users = await User.find({});
        return res.send({code: 200, users});
    } catch(err) {
        return res.status(400).send({error: err.message})
    }
});

router.get('/api/v1/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({error: "User not found."})
        }

        return res.send({code: 200, user});
    } catch(err) {
        return res.status(400).send({error: err.message})
    }
});

router.patch('/api/v1/users/:id', async (req, res) => {
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid updates!"});
    }

    if (!req.params.id) {
        return res.status(500).send({error: "No id provided"});
    }

    try {
        const user = await User.findById(req.params.id);
        updates.forEach(update => user[update] = req.body[update]);

        await user.save();

        if (!user) {
            return res.status(404).send({error: 'User not found'});
        }

        return res.send(user);
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
});

router.delete('/api/v1/users/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(500).send({error: "No id provided"});
    }

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({error: "User not found."})
        }

        return res.send({code: 200, user});
    } catch(err) {
        return res.status(400).send({error: err.message})
    }
});

router.post('/api/v1/users/login', async (req, res) => {
    try {
        const user = await User.findByCreadentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (err) {
        res.status(400).send();
    }
});

export default router;