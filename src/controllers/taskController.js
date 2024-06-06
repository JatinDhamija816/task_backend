import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            })
        }
        const task = new Task({ title, description })
        await task.save()

        return res.status(201).json({
            success: true,
            message: 'Task Created Successfully',
            task
        })
    } catch (error) {
        console.error('Error While Creating New task ', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error While Creating New Task',
            error: error.message
        });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        return res.status(200).json({
            success: true,
            message: 'All tasks retrieved successfully',
            data: tasks
        })
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve tasks',
            error: error.message || 'Internal Server Error'
        });
    }
}

export const markTask = async (req, res) => {
    try {
        const { id } = req.params

        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task Not found'
            })
        }
        if (task.completed) {
            return res.status(400).json({
                success: false,
                message: 'Task is already completed'
            });
        }
        task.completed = true
        await task.save()

        return res.status(200).json({
            success: true,
            message: 'Task marked as completed',
            task
        })
    } catch (error) {
        console.error('Error in markTask module:', error);
        return res.status(500).json({
            success: false,
            message: 'Error marking task as completed',
            error: error.message
        });
    }
}

export const editTask = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body

        let updatedField = {}
        if (title) updatedField.title = title
        if (description) updatedField.description = description

        const task = await Task.findByIdAndUpdate(id, updatedField, { new: true })

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Task Edited Successfully',
            task
        })

    } catch (error) {
        console.error('Error in Edit Task Module ', error)
        return res.status(500).json({
            success: false,
            message: 'Error in Edit Task Module',
            error
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).json({
                success: 'false',
                message: 'Task Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Task Deleted'
        })
    } catch (error) {
        console.error('Error occurred while deleting task:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error: Could not delete task',
            error: error.message,
        });
    }
} 