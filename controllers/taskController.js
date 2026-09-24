const Task = require("../models/Task");
const cache = require("../cache");

// ==========================================
// GET ALL TASKS
// GET /tasks
// ==========================================

const getAllTasks = async (req, res, next) => {

    try {

        const cachedTasks = cache.get("all_tasks");

        if (cachedTasks) {

            console.log("CACHE HIT");

            return res.status(200).json(cachedTasks);
        }

        console.log("CACHE MISS");

        const tasks = await Task.find();

        const responseData = {
            success: true,
            count: tasks.length,
            data: tasks
        };

        cache.set("all_tasks", responseData);

        res.status(200).json(responseData);

    } catch (error) {

        next(error);

    }

};


// ==========================================
// GET TASK BY ID
// GET /tasks/:id
// ==========================================

const getTaskById = async (req, res, next) => {

    try {

        const task = await Task.findById(
            req.params.id
        );

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// CREATE TASK
// POST /tasks
// ==========================================

const createTask = async (req, res, next) => {

    try {

        const task = await Task.create(req.body);

        // Invalidate cached task list
        cache.del("all_tasks");

        console.log(
            "CACHE INVALIDATED - Task created"
        );

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// UPDATE TASK
// PUT /tasks/:id
// ==========================================

const updateTask = async (req, res, next) => {

    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        // Invalidate cached task list
        cache.del("all_tasks");

        console.log(
            "CACHE INVALIDATED - Task updated"
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// DELETE TASK
// DELETE /tasks/:id
// ==========================================

const deleteTask = async (req, res, next) => {

    try {

        const task = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        // Invalidate cached task list
        cache.del("all_tasks");

        console.log(
            "CACHE INVALIDATED - Task deleted"
        );

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: task
        });

    } catch (error) {

        next(error);

    }

};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};