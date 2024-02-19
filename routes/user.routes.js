const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/user', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/userdetail/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);

module.exports = router;