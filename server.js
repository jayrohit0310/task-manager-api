const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;


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

// These routes are public
// POST /auth/register
// POST /auth/login

app.use("/auth", authRoutes);


// ==========================================
// PROTECTED TASK ROUTES
// ==========================================

// JWT authentication is required
// for every task route.

app.use(
    "/tasks",
    authMiddleware,
    taskRoutes
);


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


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
    .connect(process.env.MONGO_URI)

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

        app.listen(PORT, () => {

            console.log(
                `Server running on http://localhost:${PORT}`
            );

        });

    })

    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

    });