const express = require('express');
const router = express.Router();
const userController = require('../controllers/registerController');

// Register a new user
router.post('/register', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);

// Login as an admin
router.post('/login/admin', userController.loginAdmin);

//update password

router.post('/update-password', userController.updateUserPassword)

// Get user data
router.get('/users/:userId', userController.getUser);

module.exports = router;
