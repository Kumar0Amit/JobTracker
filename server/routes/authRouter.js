// routes/authRoutes.js

import { Router } from 'express';
const router = Router();

import {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerificationEmail,
} from '../controllers/authController.js';

import {
  validateRegisterInput,
  validateLoginInput,
  validateEmailInput,
  validateResetPasswordInput,
} from '../middleware/validationMiddleware.js';

import { authenticateUser } from '../middleware/authMiddleware.js';

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', authenticateUser, logout); // Changed to GET for simplicity, can be POST
router.get('/verify-email', verifyEmail); // Validation can be added if needed
router.post('/forgot-password', validateEmailInput, forgotPassword);
router.post('/reset-password', validateResetPasswordInput, resetPassword);
router.post('/resend-verification', validateEmailInput, resendVerificationEmail);

export default router;