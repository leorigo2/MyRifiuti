const express = require('express');
const router = express.Router();
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

// Definitions of Routes
router.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
);

router.post('/login',
    AuthenticationController.login
);

module.exports = router;