const bcrypt = require('bcrypt');
const Company = require('../../models/compay model ');
const User = require('../../models/user.model'); // Adjust the path to your User model
const tokenService = require('../../utlis/token service'); // Your token service
const { sendEmail } = require('../../utlis/sendEmail.conflik');
const { generateOTP } = require('../../utlis/otp.server');

const loginWithEmail = async (email, password) => {
  const user = await User.findOne({ userEmail: email });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.isBlocked) {
    throw new Error('User is blocked');
  }

  if (!user.isVerified) {
    throw new Error('Email is not verified');
  }

  const isMatch = await bcrypt.compare(password, user.userPassword);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  // Update login status and last login
  user.isLogin = true;
  user.lastLogin = new Date();
  await user.save();

  const payload = {
    userId: user._id,
    role: user.userRole,
    userType: user.userType // if you added this in schema
  };

  const accessToken = tokenService.generateAccessToken(payload);
  const refreshToken = tokenService.generateRefreshToken(payload);

  return {
    user,
    accessToken,
    refreshToken
  };
};
const signupWithEmail = async (userData) => {
  const { userName, userEmail, userPassword, userPhone, countryCode } = userData;

  // Check if user already exists by email or phone
  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userPhone }]
  });
  console.log(existingUser)
  if (existingUser) {
    throw new Error('User with this email or phone already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  const otp = generateOTP(6, 5)
  // Create user
  const newUser = new User({
    userName,
    userEmail,
    userPassword: hashedPassword,
    userPhone,
    countryCode,
    isVerifiied: false,
    otp: {
      code: otp.otp,
      expiresAt: otp.expiresAt
    },
    userRole: 'user',  // or set dynamically if needed
    isLogin: true,
    lastLogin: new Date()
  });

  await newUser.save();

  const payload = {
    userId: newUser._id,
    role: newUser.userRole,
    userType: newUser.userType // if you added this in schema
  };

  const accessToken = tokenService.generateAccessToken(payload);
  const refreshToken = tokenService.generateRefreshToken(payload);
  const subject = 'Welcome to Our Platform!';
  const text = `Hi ${userName}, welcome! Please verify your email to get started.`;
  const html = `<p>Hi <strong>${userName}</strong>,</p><p>Welcome! Please verify your email this is your otp ${otp.otp}to get started.</p>`;
  sendEmail(userEmail, subject, text, html).catch(console.error)

  return {
    user: newUser,
    accessToken,
    refreshToken
  };
};
const verifyEmail = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    console.log("1st run")
    const result = await authService.verifyEmail(otp, userEmail);
    console.log("final run");
    res.status(200).json({
      message: "user verified successfully",
    })
  }
  catch (err) {
    console.log("Catched error")
    res.status(401).json({ error: err.message }); res.status(401).json({ error: err.message });
  }
}
const createCompanyForUser = async (userId, companyData) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.userRole !== 'supplier') {
    throw new Error('Only suppliers can create companies');
  }

  if (!user.isVerified) {
    throw new Error('Email not verified');
  }

  if (user.isBlocked) {
    throw new Error('User is blocked');
  }

  if (user.companyId) {
    throw new Error('User already has a company');
  }

  // Create a new company with explicit fields
  const newCompany = new Company({
    name: companyData.name,
    industryType: companyData.industryType,
    registrationNumber: companyData.registrationNumber,
    gstNumber: companyData.gstNumber,
    countryCode: companyData.countryCode,
    phone: companyData.phone,
    email: companyData.email,
    address: {
      street: companyData.address?.street,
      city: companyData.address?.city,
      state: companyData.address?.state,
      pinCode: companyData.address?.pinCode,
      country: companyData.address?.country
    },
    website: companyData.website || '',
    location: {
      lat: companyData.location?.lat,
      long: companyData.location?.long
    },
    documents: Array.isArray(companyData.documents) ? companyData.documents.map(doc => ({
      docType: doc.docType,
      url: doc.url
    })) : [],
    approved: false,
    status: 'pending'
  });

  const savedCompany = await newCompany.save();

  // Update user with companyId
  user.companyId = savedCompany._id;
  await user.save();

  return savedCompany;
};
module.exports = {
  loginWithEmail, signupWithEmail, createCompanyForUser,
};