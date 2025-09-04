import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';

export const sendVerificationEmail = async (user) => {
  // Generate raw token and hash it
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

  // Store hashed token and expiry
  user.verificationToken = hashedToken;
  user.verificationTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour

  // Construct verification URL
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const verifyUrl = `${clientUrl}/verify-email?token=${rawToken}&email=${user.email}`;

  // Build email content
  const html = `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9fafb; border-radius: 10px; border: 1px solid #e5e7eb;">
    <h2 style="color: #2563eb; text-align: center;">Welcome to MyJobTracker 🎉</h2>
    <p style="font-size: 16px; color: #374151;">Hi <strong>${user.name}</strong>,</p>
    <p style="font-size: 16px; color: #374151;">
      Thanks for signing up! To activate your account, please verify your email by clicking the button below:
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${verifyUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
        Verify My Email
      </a>
    </div>
    <p style="font-size: 14px; color: #6b7280;">
      This link will expire in <strong>1 hour</strong>. If you didn’t create an account, feel free to ignore this message.
    </p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
    <p style="font-size: 12px; color: #9ca3af; text-align: center;">
      &copy; ${new Date().getFullYear()} MyJobTracker. All rights reserved.
    </p>
  </div>
`;

const plainTextMessage = `
Welcome to MyJobTracker 🎉

Hi ${user.name},

Thanks for signing up! Please verify your email by visiting the link below:

${verifyUrl}

This link will expire in 1 hour. If you didn’t create an account, you can ignore this email.

— MyJobTracker Team
`;



  // Send email
  await sendEmail({
  to: user.email,
  subject: 'Verify Your Email',
  html,
  text: plainTextMessage, // ✅ Now it's defined
});

};