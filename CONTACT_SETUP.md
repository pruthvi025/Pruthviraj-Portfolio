# 📧 Contact Form Email Setup Guide

Your portfolio now has a **fully functional contact form** that sends emails directly to your inbox! Here's how to set it up:

## 🚀 **Quick Setup (Choose One Method)**

### **Method 1: Resend (Recommended - Free Tier Available)**

1. **Sign up at [resend.com](https://resend.com)**
2. **Get your API key** from the dashboard
3. **Create a `.env.local` file** in your portfolio root:

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=your-email@gmail.com
CONTACT_FROM=portfolio-contact@yourdomain.com
```

### **Method 2: Gmail SMTP (Free)**

1. **Enable 2FA** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"
3. **Create `.env.local`**:

```bash
# .env.local
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-digit-app-password
CONTACT_EMAIL=your-email@gmail.com
CONTACT_FROM=your-email@gmail.com
```

### **Method 3: Custom SMTP (Any Email Service)**

```bash
# .env.local
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
CONTACT_EMAIL=your-email@gmail.com
CONTACT_FROM=your-email@domain.com
```

## 📁 **File Structure**

```
portfolio/
├── .env.local          # Your email configuration
├── data/               # Contact submissions storage
│   └── contacts.json   # All contact form submissions
├── src/
│   ├── app/api/contact/route.ts  # Email API
│   └── components/contact-form.tsx # Contact form UI
```

## 🔧 **How It Works**

### **1. Contact Form Submission**
- User fills out the form
- Data is validated (name, email, message required)
- Optional fields: subject, phone

### **2. Email Processing**
- Contact details are stored locally
- Email notification is sent to your inbox
- Professional HTML email with all details

### **3. Data Storage**
- All submissions saved to `data/contacts.json`
- Includes timestamp, IP address, user agent
- Keeps last 100 submissions

## 📧 **Email Features**

### **Professional Email Template**
- ✅ **Sender Information**: Name, email, phone, subject
- ✅ **Message Content**: Full message with formatting
- ✅ **Metadata**: Timestamp, IP address, submission ID
- ✅ **Responsive Design**: Works on all email clients

### **Email Content Includes**
- 👤 **Name** of the person contacting you
- 📧 **Email** address (clickable)
- 📱 **Phone** number (if provided)
- 📝 **Subject** line (if provided)
- 💬 **Full message** content
- ⏰ **Submission timestamp**
- 🌐 **IP address** for security
- 🆔 **Unique submission ID**

## 🛡️ **Security Features**

- **Input Validation**: All fields validated before processing
- **Rate Limiting**: Built-in protection against spam
- **Data Sanitization**: Prevents XSS and injection attacks
- **IP Logging**: Tracks submissions for security monitoring

## 🎨 **Customization**

### **Change Email Template**
Edit the `generateEmailHTML()` and `generateEmailText()` functions in `src/app/api/contact/route.ts`

### **Modify Form Fields**
Update the `ContactSchema` in both the API route and contact form component

### **Styling Updates**
Modify `src/components/contact-form.tsx` for UI changes

## 🚀 **Testing**

### **Development Mode**
- Without email setup: Logs to console
- With email setup: Sends actual emails

### **Production Testing**
1. Deploy your portfolio
2. Fill out the contact form
3. Check your email inbox
4. Verify data storage in `data/contacts.json`

## 🔍 **Troubleshooting**

### **Email Not Sending?**
1. Check your `.env.local` file exists
2. Verify API keys/passwords are correct
3. Check console for error messages
4. Ensure environment variables are loaded

### **Form Not Working?**
1. Check browser console for errors
2. Verify API route is accessible
3. Check network tab for failed requests

### **Common Issues**
- **Gmail**: Make sure you're using App Password, not regular password
- **Resend**: Verify your domain is verified if using custom sender
- **SMTP**: Check port numbers and security settings

## 📱 **Mobile Responsiveness**

The contact form is fully responsive and works perfectly on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones
- ✅ All screen sizes

## 🌟 **Features Summary**

- **📝 Enhanced Form**: Name, email, subject, phone, message
- **📧 Direct Email**: Sends to your inbox immediately
- **💾 Local Storage**: Keeps all submissions locally
- **🎨 Beautiful UI**: Modern, responsive design
- **🔒 Secure**: Input validation and sanitization
- **📱 Mobile Ready**: Works on all devices
- **⚡ Fast**: Optimized performance
- **🔄 Real-time**: Instant feedback and validation

## 🎯 **Next Steps**

1. **Choose your email method** (Resend recommended)
2. **Create `.env.local`** with your credentials
3. **Test the form** by submitting a message
4. **Check your email** for the notification
5. **Customize** the email template if needed

Your contact form is now **production-ready** and will help you capture leads and opportunities! 🚀
