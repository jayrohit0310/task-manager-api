const errorHandler = (err, req, res, next) => {

    console.error(err.message);

    // Mongoose validation error
    if (err.name === "ValidationError") {

        const errors = Object.values(err.errors)
            .map(error => error.message);

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });

    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {

        return res.status(400).json({
            success: false,
            message: "Invalid task ID"
        });

    }

    // General server error
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

};

module.exports = errorHandler;