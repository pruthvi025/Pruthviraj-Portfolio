const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

const testGmailSMTP = async () => {
  try {
    console.log('Testing Gmail SMTP connection...');
    console.log('GMAIL_USER:', process.env.GMAIL_USER);
    console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '***SET***' : 'NOT SET');
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ Gmail SMTP connection verified successfully!');

    // Send test email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      subject: 'Test Email from Portfolio Contact Form',
      text: 'This is a test email to verify Gmail SMTP is working correctly.',
      html: '<h1>Test Email</h1><p>This is a test email to verify Gmail SMTP is working correctly.</p>'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);

  } catch (error) {
    console.error('❌ Gmail SMTP test failed:');
    console.error('Error details:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.command) console.error('Command:', error.command);
  }
};

testGmailSMTP();
