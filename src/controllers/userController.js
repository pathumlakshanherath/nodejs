const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};