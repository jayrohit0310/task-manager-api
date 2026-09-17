const express = require("express");

const validateTask = require("../middleware/validateTask");

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


// ==========================================
// GET ALL TASKS
// ==========================================

router.get(
    "/",
    getAllTasks
);


// ==========================================
// GET TASK BY ID
// ==========================================

router.get(
    "/:id",
    validateId,
    getTaskById
);


// ==========================================
// CREATE TASK
// ==========================================

router.post(
    "/",
    validateJson,
    validateTask,
    createTask
);


// ==========================================
// UPDATE TASK
// ==========================================

router.put(
    "/:id",
    validateJson,
    validateId,
    validateTask,
    updateTask
);


// ==========================================
// DELETE TASK
// ==========================================

router.delete(
    "/:id",
    validateId,
    deleteTask
);


module.exports = router;