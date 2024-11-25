// emailService.js

import postmark from 'postmark'
const client = new postmark.ServerClient('');

const sendEmail = (to, subject, text, html) => {
  client.sendEmail({
    "From": "info@thehhdcenter.org",
    "To": to,
    "Subject": subject,
    "TextBody": text,
    "HtmlBody": html,
  }, (error, success) => {
    if (error) {
      console.error("Unable to send email: " + error.message);
      return;
    }
    console.log("Email sent: " + success.Message);
  });
};

export default sendEmail
