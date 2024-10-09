const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next(); // Continue to the next middleware or route
};

module.exports = loggerMiddleware;
