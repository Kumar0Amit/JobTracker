// controllers/authController.js

import crypto from 'crypto';
import User from '../models/userModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import { attachCookiesToResponse } from '../utils/jwt.js';
import { UnauthenticatedError, BadRequestError } from '../errors/customErrors.js';
import { sendVerificationEmail } from './sendVerificationEmail.js';

export const register = async (req, res) => {
  const { name, email, password, country, state, city } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    if (user.accountVerified) {
      throw new BadRequestError('Email already registered and verified.');
    }

    // Update user and resend verification
    user.name = name;
    user.password = password;
    user.country = country;
    user.state = state;
    user.city = city;
  } else {
    // Create new user
    const avatar = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}`;
    user = new User({ name, email, password, country, state, city, avatar });
  }

  await sendVerificationEmail(user);
  await user.save();

  res.status(201).json({
    message: 'Verification email sent. Please check your inbox.',
  });
};

//   const { name, email, password,country,state,city } = req.body;
//   const origin = process.env.CLIENT_URL || 'http://localhost:3000';

//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     // If user exists but is not verified, treat as a re-registration attempt.
//     // The validation middleware already prevents registration if the user is verified.
//     await sendVerificationEmail(existingUser, origin);
//     existingUser.name = name;
//     existingUser.password = password; // Pre-save hook will hash
//     await existingUser.save();
    
//     res.status(200).json({
//       message: 'It looks like you already started registering. We\'ve sent a new verification link to your email.',
//     });
//     return;
//   }

//    // ✅ 1. GENERATE THE DEFAULT AVATAR URL
//   const nameForAvatar = name.split(' ').join('+');
//   const avatar = `https://ui-avatars.com/api/?name=${nameForAvatar}`;

//   // ✅ 2. ADD THE AVATAR WHEN CREATING THE NEW USER
//   const user = new User({ name, email, password, avatar,country,state, city });
//   await sendVerificationEmail(user, origin);
//   await user.save();
  
//   // // Create new user
//   // const user = new User({ name, email, password });
//   // await sendVerificationEmail(user, origin);
//   // await user.save();

//   res.status(201).json({
//     message: 'Registration successful. Please check your email to verify your account.',
//   });
// };

// export const verifyEmail = async (req, res) => {
//   const { token, email } = req.query;
//   console.log("Received verify request:", { token, email });
//   const user = await User.findOne({ email, verificationToken: token });

//   if (!user) {
//     throw new BadRequestError('Invalid verification link.');
//   }
//   if (user.accountVerified) {
//     return res.status(200).json({ message: 'Account is already verified. Please log in.' });
//   }
//   if (Date.now() > user.verificationTokenExpires) {
//     throw new BadRequestError('Verification link has expired. Please request a new one.');
//   }

//   user.accountVerified = true;
//   user.verificationToken = undefined;
//   user.verificationTokenExpires = undefined;
//   await user.save();

//   res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
// };


// export const verifyEmail = async (req, res) => {
//   const { token, email } = req.query;
//   console.log("Received verify request:", { token, email });

//   const user = await User.findOne({ email });
//   const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//   console.log("🔍 Verifying token for:", email);
// console.log("🔑 Raw token:", token);
// console.log("🔐 Hashed token:", hashedToken);
// console.log("🗃️ Stored token:", user?.verificationToken);
// console.log("⏰ Expiry:", user?.verificationTokenExpires);

//   if (!user) {
//     throw new BadRequestError("Invalid verification link.");
//   }

//   if (!user.verificationToken || user.verificationToken !== hashedToken) {
//   return res.status(400).json({ message: "Invalid or expired token." });
// }

// if (Date.now() > user.verificationTokenExpires) {
//   return res.status(400).json({ message: "Verification link expired." });
// }

// if (user.accountVerified) {
//   console.log("⚠️ Account already verified branch triggered.");
//   return res.status(200).json({ message: "Account is already verified. Please log in." });
// }


//   // 🚨 check if already verified
//   // if (user.accountVerified && !user.verificationToken) {
//   //   console.log("⚠️ Account already verified branch triggered.");
//   //   return res.status(200).json({
//   //     message: "Account is already verified. Please log in.",
//   //   });
//   // }

//   // // 🚨 check token match
//   // if (user.verificationToken !== token) {
//   //   throw new BadRequestError("Invalid verification token.");
//   // }

//   // // 🚨 check expiry
//   // if (Date.now() > user.verificationTokenExpires) {
//   //   throw new BadRequestError("Verification link has expired. Please request a new one.");
//   // }

//   // ✅ Verify user
//   user.accountVerified = true;
//   user.verificationToken = undefined;
//   user.verificationTokenExpires = undefined;
//   await user.save();

//   res.status(200).json({
//     message: "Email verified successfully. You can now log in.",
//   });
// };
// import crypto from 'crypto';
// import User from '../models/userModel.js';
// import { BadRequestError } from '../errors/customErrors.js';

export const verifyEmail = async (req, res) => {
  const { token, email } = req.query;

  if (!token || !email) {
    throw new BadRequestError('Missing token or email.');
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError('User not found.');
  }

  if (user.accountVerified) {
    if (user.verificationToken) {
    return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } else {
    return res.status(200).json({ message: 'Account  verified. Please log in.' });
  }
  }

  if (!user.verificationToken || user.verificationToken !== hashedToken) {
    throw new BadRequestError('Invalid or expired token.');
  }

  if (Date.now() > user.verificationTokenExpires) {
    throw new BadRequestError('Verification link has expired.');
  }

  user.accountVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
};



export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const origin = process.env.CLIENT_URL || 'http://localhost:3000';

  if (user &&!user.accountVerified) {
    await sendVerificationEmail(user, origin);
    await user.save();
  }

  res.status(200).json({
    message: 'If an account with that email exists and is not verified, a new verification link has been sent.',
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user ||!(await user.comparePassword(password))) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  if (!user.accountVerified) {
    throw new UnauthenticatedError('Please verify your email to log in.');
  }

  attachCookiesToResponse(res, user);
  res.status(200).json({ message: 'Login successful', user });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: 'User logged out successfully' });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const origin = process.env.CLIENT_URL || 'http://localhost:3000';

  if (user) {
    const resetToken = user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${origin}/reset-password?token=${resetToken}`;
    const message = `<p>Please click the following link to reset your password: <a href="${resetUrl}">Reset Password</a>. This link is valid for 15 minutes.</p>`;

    try {
      await sendEmail({ to: user.email, subject: 'Password Reset Request', html: message });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      // Let the central error handler manage the response
      throw new Error('Email could not be sent');
    }
  }

  res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
};

export const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new BadRequestError('Invalid or expired token');
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ message: 'Password reset successful' });
};

