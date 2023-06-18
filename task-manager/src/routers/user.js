import express from 'express';
import { User } from '../models/user.js';
import { auth } from '../middleware/auth.js';
import multer from 'multer';

const router = new express.Router();

router.post('/api/v1/users/login', async (req, res) => {
    try {
        const user = await User.findByCreadentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (err) {
        console.log(err.message);
        res.status(400).send();
    }
});

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

router.post('/api/v1/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });

        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/api/v1/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/api/v1/users/me', auth, async (req, res) => {
    return res.send(req.user);
});

router.patch('/api/v1/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid updates!"});
    }

    try {
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);

        await user.save();

        return res.send(user);
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
});

router.delete('/api/v1/users/me', auth, async (req, res) => {
    try {
        await User.deleteOne({_id: req.user._id});
        res.send(req.user);
    } catch(err) {
        return res.status(400).send({error: err.message})
    }
});


const multerUpload = multer({
    dest: 'images/avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        console.log();
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Uploaded file must be an image.'))
        }

        return cb(undefined, true);
    }
});

router.post('/api/v1/users/me/avatar', [auth, multerUpload.single('avatar')], (req, res) => {

    res.send();
});

export default router;