
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// ==========================================
// CORS
// ==========================================

app.use(cors());

// ==========================================
// BUILT-IN MIDDLEWARE
// ==========================================

app.use(express.json());

// ==========================================
// LOGGING MIDDLEWARE
// ==========================================

app.use(logger);

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

app.use("/auth", authRoutes);

// ==========================================
// PROTECTED TASK ROUTES
// ==========================================

app.use("/tasks", authMiddleware, taskRoutes);

// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use(errorHandler);

module.exports = app;
