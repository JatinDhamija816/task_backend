import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task Title is required']
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    }
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema)

export default Task