const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/signUp', userController.signUp);
router.put('/signIn', userController.signIn);

module.exports = router;