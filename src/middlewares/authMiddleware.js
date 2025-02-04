module.exports = (req, res, next) => {
    // Example of a simple auth middleware
    if (req.headers.authorization) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};