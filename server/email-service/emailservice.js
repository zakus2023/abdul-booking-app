// emailService.js

import postmark from 'postmark';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

const sendEmail = async (to, subject, text, html) => {
  try {
    const response = await client.sendEmail({
      From: "info@thehhdcenter.org",
      To: to,
      Subject: subject,
      TextBody: text,
      HtmlBody: html,
    });
    console.log("Email sent: ", response.Message);
  } catch (error) {
    console.error("Unable to send email: ", error.message);
  }
};

export default sendEmail;

