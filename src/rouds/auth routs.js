const express = require('express');
const router = express.Router();
const {
  signupController,
  loginController,
  verifyEmail,
  createCompanyController,

} = require('../controller/auth controller');

// @route   POST /api/auth/signup
// @desc    Register new user
router.post('/signup', signupController);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginController);

router.post('/verify',verifyEmail)
router.post("/company",createCompanyController)

module.exports = router;