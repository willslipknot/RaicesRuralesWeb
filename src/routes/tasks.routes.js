import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {getTask, getTasks , updateTasks, createTasks, deleteTasks} from '../controllers/tasks.controller.js'

const router = Router()

router.get('/tasks', authRequire,)

router.get('/tasks:id', authRequire,)

router.post('/tasks', authRequire,)

router.delete('/tasks:id', authRequire,)

router.put('/tasks:id', authRequire,)

export default router