import mongoose from 'mongoose';
await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api'); 

export default mongoose;
