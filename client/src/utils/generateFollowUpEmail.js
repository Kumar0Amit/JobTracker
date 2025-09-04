export const generateFollowUpEmail = ({ name, position, company, senderName }) => {
  const recipient = name || 'Hiring Manager';
  return `Hi ${recipient},

I hope you're doing well. I wanted to follow up on my application for the ${position} role at ${company}. I'm genuinely excited about the opportunity and believe my skills align well with the role.

If there are any updates or next steps, I’d be grateful to hear from you. Please let me know if you need any additional information.

Looking forward to your response.

Best regards,  
${senderName || 'Your Name'}`;
};
