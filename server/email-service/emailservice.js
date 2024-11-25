// emailService.js

import postmark from 'postmark'
const client = new postmark.ServerClient('68b057ac-6298-4f17-9895-834d1b56fbc1');

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
