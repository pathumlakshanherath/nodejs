const userService = require('../services/user.service');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.signUp = async (req, res, next) => {
    try {
        const token = await userService.signup(req.body);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

exports.signIn = async (req, res, next) => {
    try {
        const token = await userService.signIn(req.body);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};