'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports.sendEmail = async (event) => {
  try {
    const { receiver_email, subject, body_text } = JSON.parse(event.body || '{}');

    if (!receiver_email || !subject || !body_text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Missing required fields.' }),
      };
    }

    // Create transporter (Gmail SMTP example)
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Serverless Email API" <${process.env.SMTP_USER}>`,
      to: receiver_email,
      subject: subject,
      text: body_text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully!' }),
    };

  } catch (err) {
    console.error('SMTP Error:', err);
    console.log('SMTP Configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? 'Set' : 'Not Set',
      pass: process.env.SMTP_PASS ? 'Set' : 'Not Set'
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to send email', 
        error: err.message,
        details: err.response || 'No additional error details'
      }),
    };
  }
};
