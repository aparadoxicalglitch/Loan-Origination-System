const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// backend/routes/userRoutes.js

// ... (existing code)

router.post('/admin-login', userController.loginAdmin);

// ... (existing code)

module.exports = router;
