import nodeMailer from "nodemailer";

/**
 * Sends an email using nodemailer.
 * @param {object} options - The email options.
 * @param {string} options.to - The recipient's email address.
 * @param {string} options.subject - The subject of the email.
 * @param {string} options.html - The HTML body of the email.
 */
export const sendEmail = async ({ to, subject, html }) => {
  // 1. Create a transporter object using SMTP transport
  // This configuration should be stored in environment variables for security.
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE, // e.g., 'gmail'
    port: process.env.SMTP_PORT,
    secure: true, // use true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL, // Your email address
      pass: process.env.SMTP_PASSWORD, // Your email password or app-specific password
    },
  });

  // 2. Define the mail options
  const options = {
    from: `"Your App Name" <${process.env.SMTP_MAIL}>`, // Sender address
    to: to,         // Recipient's email, passed from the controller
    subject: subject, // Subject line, passed from the controller
    html: html,       // HTML body, passed from the controller
  };

  // 3. Send the email
  // The sendMail method returns a promise, which we await.
  await transporter.sendMail(options);
};