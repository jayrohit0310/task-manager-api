// ======================================
// Logging Middleware
// Logs every incoming request
// ======================================

const logger = (req, res, next) => {

    const currentTime = new Date().toLocaleString();

    console.log("------------------------------------");
    console.log("Incoming Request");
    console.log(`Method    : ${req.method}`);
    console.log(`URL       : ${req.originalUrl}`);
    console.log(`Time      : ${currentTime}`);
    console.log("------------------------------------");

    // Continue to the next middleware
    next();

};

module.exports = logger;