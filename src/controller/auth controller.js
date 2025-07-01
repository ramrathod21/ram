const { verify } = require('jsonwebtoken');
const signupService = require('../services/auth.service');
const authService = require('../services/auth.service');
// auth.controller.js
// const { createCompany } = require('../services/auth.service');

const signupController = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userPhone, countryCode } = req.body;

    const { user, accessToken, refreshToken } = await signupService.signupWithEmail({
      userName,
      userEmail,
      userPassword,
      userPhone,
      countryCode
    });

    res.status(201).json({
      message: 'Signup successful',
      user,
      accessToken,
      refreshToken
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.loginWithEmail(email, password);

    res.status(200).json({
      message: 'Login successful',
      user,
      accessToken,
      refreshToken
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const verifyEmail = async (Otp,userEmail) =>{
  const existing_user = await User.findOne({userEmail}) 
  if(!existing_user){
    throw Error("User not found")
  }
  console.log(existing_user.otp,"user found")
  if(existing_user.otp.code == Otp){
    console.log("first run")
    existing_user.isVerified = true;
    console.log("second run")
    await existing_user.save()
    console.log("third run")
    return true;
  }
  else{
    console.log("forth")
    throw Error("OTP is wrong ")
  }

}

const createCompanyController = async (req, res) => {
  try {
    const {
      name,
      industryType,
      registrationNumber,
      gstNumber,
      countryCode,
      phone,
      email,
      address,
      website,
      location,
      documents
    } = req.body;

    const userId = req.user?.userId; 

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    const companyData = {
      name,
      industryType,
      registrationNumber,
      gstNumber,
      countryCode,
      phone,
      email,
      address,
      website,
      location,
      documents
    };

    const newCompany = await authService.createCompanyForUser(userId, companyData);

    res.status(201).json({
      message: 'Company created successfully',
      company: newCompany
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = {
  signupController,
  loginController,
  verifyEmail,
  createCompanyController,
};