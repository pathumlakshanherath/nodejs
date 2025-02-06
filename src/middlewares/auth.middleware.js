const jwt = require('jsonwebtoken');
const userService = require('../services/user.service')

const protect = async (req, res, next) => {
    try {

        if (
            (req.path === '/users/signUp' && req.method === 'POST') ||
            (req.path === '/users/signIn' && req.method === 'PUT')
        ) {
            return next();
        }

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in. Please log in to get access',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userService.findByEmail(decoded.email);
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token no longer exists',
            });
        }

        // Grant access to protected route
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: error.message,
        });
    }
};

module.exports = protect;