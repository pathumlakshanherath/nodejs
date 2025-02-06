const authService = require('../services/auth.service');

exports.signUp = async (req, res, next) => {
    try {
        const token = await authService.signup(req.body);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

exports.signIn = async (req, res, next) => {
    try {
        const token = await authService.signIn(req.body);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};