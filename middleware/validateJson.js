// ======================================
// JSON Content-Type Validation Middleware
// ======================================

const validateJson = (req, res, next) => {

    // Check only POST and PUT requests

    if (req.method === "POST" || req.method === "PUT") {

        const contentType = req.headers["content-type"];

        if (!contentType || !contentType.includes("application/json")) {

            return res.status(400).json({

                success: false,

                message: "Content-Type must be application/json"

            });

        }

    }

    // Continue to next middleware

    next();

};

module.exports = validateJson;