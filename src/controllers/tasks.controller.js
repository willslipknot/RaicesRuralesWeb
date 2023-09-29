import Tareas from "../models/task.models"

export const getTasks = async (req, res) => {
    const tasks = await Tareas.find()
    res.json(tasks)
};

export const createTasks = async (req, res) => {
    const { title, description, date } = req.body

    const newTask = new Task({
        title,
        description,
        date
    })
    const savedtask = await newTask.save()
    res.json(savedtask)
};

export const getTask = async (req, res) => {
    const task = await Tareas.findByPk(req.Tareas.id)
    if (!task) return res.status(404).json
    res.json(tasks)
};

export const updateTasks = async (req, res) => {
    const task = await Tareas.findByPkandUpdate(req.Tareas.id)
    if (!task) return res.status(404).json({ mesagge: 'Tarea no encontrada' })
    res.json(task)
};

export const deleteTasks = async (req, res) => {
    const task = await Tareas.findByPkandDelete(req.Tareas.id)
    if (!task) return res.status(404).json
    res.json(task)
};
