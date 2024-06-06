import express from 'express'
import { createTask, getAllTasks, markTask, editTask, deleteTask } from '../controllers/taskController.js'

const router = express.Router()

router.post('/createTask', createTask)
router.get('/getAllTasks', getAllTasks)
router.put('/markTask/:id', markTask)
router.put('/editTask/:id', editTask)
router.delete('/deleteTask/:id', deleteTask)

export default router