const express = require("express");

const router = express.Router();

const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const validateJson =
    require("../middleware/validateJson");

const validateId =
    require("../middleware/validateId");


// GET all tasks
router.get(
    "/",
    getAllTasks
);


// GET task by ID
router.get(
    "/:id",
    validateId,
    getTaskById
);


// Create task
router.post(
    "/",
    validateJson,
    createTask
);


// Update task
router.put(
    "/:id",
    validateJson,
    validateId,
    updateTask
);


// Delete task
router.delete(
    "/:id",
    validateId,
    deleteTask
);


module.exports = router;