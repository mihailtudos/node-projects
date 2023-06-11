import mongoose from 'mongoose';
import validator from 'validator';

await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api'); 

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email must be correctly formated.")
            }
        },
        trim: true,
        lowercase: true
    },
    age: {
        default: 0,
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minLength: 7,
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password cannot contain 'password'.")
            }
        }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const mihail = new User({
    name: "Mihail",
    email: "MIHAIL@gmail.com",
    age: 28,
    password: "   dsads",
});

// await mihail.save()
//     .then((data) => {
//         console.log('use: ', data);
//     }).catch(err => {
//         console.log('Something went wrong', err.message);
//     });

const workTask = new Task({
    description: 'Please work daily to achive goals',
})

await workTask.save()
    .then((data) => {
        console.log('use: ', data);
    }).catch(err => {
        console.log('Something went wrong', err.message);
    });
    
mongoose.disconnect();