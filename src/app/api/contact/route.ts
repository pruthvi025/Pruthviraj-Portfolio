import { z } from "zod";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(2000),
  subject: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
});

type ContactSubmission = z.infer<typeof ContactSchema> & {
  id: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
};

// Email configuration from environment variables
const EMAIL_CONFIG = {
  to: process.env.CONTACT_EMAIL || "your-email@gmail.com",
  from: process.env.CONTACT_FROM || "portfolio-contact@yourdomain.com",
  subject: "New Contact Form Submission - Portfolio",
};

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ContactSchema.safeParse(json);
    
    if (!parsed.success) {
      return Response.json(
        { error: "Invalid payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Get client information
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Create contact submission
    const submission: ContactSubmission = {
      ...parsed.data,
      id: generateId(),
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
    };

    // Store the contact submission locally
    await storeContactSubmission(submission);

    // Send email notification
    const emailSent = await sendEmailNotification(submission);
    
    if (!emailSent) {
      console.warn("Failed to send email notification for submission:", submission.id);
    }

    return Response.json({ 
      success: true, 
      message: "Thank you! Your message has been sent successfully.",
      submissionId: submission.id 
    });

  } catch (err) {
    console.error("Contact API Error:", err);
    return Response.json({ 
      error: "Failed to process your message. Please try again." 
    }, { status: 500 });
  }
}

// GET endpoint to retrieve contact submissions (for admin purposes)
export async function GET() {
  try {
    const submissions = await getContactSubmissions();
    return Response.json({ submissions });
  } catch (err) {
    return Response.json({ error: "Failed to retrieve submissions" }, { status: 500 });
  }
}

// Helper functions
function generateId(): string {
  return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function storeContactSubmission(submission: ContactSubmission): Promise<void> {
  const dataDir = path.join(process.cwd(), "data");
  const contactsFile = path.join(dataDir, "contacts.json");

  // Create data directory if it doesn't exist
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }

  // Read existing contacts or create new array
  let contacts: ContactSubmission[] = [];
  if (existsSync(contactsFile)) {
    try {
      const fileContent = await readFile(contactsFile, "utf-8");
      contacts = JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading contacts file:", error);
      contacts = [];
    }
  }

  // Add new submission
  contacts.unshift(submission); // Add to beginning

  // Keep only last 100 submissions to prevent file from growing too large
  if (contacts.length > 100) {
    contacts = contacts.slice(0, 100);
  }

  // Write back to file
  await writeFile(contactsFile, JSON.stringify(contacts, null, 2), "utf-8");
}

async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const dataDir = path.join(process.cwd(), "data");
  const contactsFile = path.join(dataDir, "contacts.json");

  if (!existsSync(contactsFile)) {
    return [];
  }

  try {
    const fileContent = await readFile(contactsFile, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
}

async function sendEmailNotification(submission: ContactSubmission): Promise<boolean> {
  try {
    // Method 1: Using Resend (Recommended - Free tier available)
    if (process.env.RESEND_API_KEY) {
      return await sendEmailWithResend(submission);
    }
    
    // Method 2: Using Gmail SMTP (Free but requires app password)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      return await sendEmailWithGmail(submission);
    }
    
    // Method 3: Using Nodemailer with any SMTP service
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      return await sendEmailWithSMTP(submission);
    }

    // Fallback: Log to console (for development)
    console.log("📧 EMAIL NOTIFICATION (Development Mode):", {
      to: EMAIL_CONFIG.to,
      from: submission.email,
      subject: `New Contact: ${submission.name}`,
      message: submission.message,
      timestamp: submission.timestamp,
      ip: submission.ip,
    });
    
    return true; // Return true for development mode
    
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
}

// Method 1: Resend (Recommended - Modern, reliable, free tier)
async function sendEmailWithResend(submission: ContactSubmission): Promise<boolean> {
  try {
    const resend = require('resend');
    const client = new resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await client.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      subject: `New Contact Form Submission: ${submission.name}`,
      html: generateEmailHTML(submission),
      text: generateEmailText(submission),
    });

    if (error) {
      console.error("Resend error:", error);
      return false;
    }

    console.log("Email sent successfully via Resend:", data.id);
    return true;
  } catch (error) {
    console.error("Resend email error:", error);
    return false;
  }
}

// Method 2: Gmail SMTP
async function sendEmailWithGmail(submission: ContactSubmission): Promise<boolean> {
  try {
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: EMAIL_CONFIG.to,
      subject: `New Contact Form Submission: ${submission.name}`,
      html: generateEmailHTML(submission),
      text: generateEmailText(submission),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully via Gmail:", info.messageId);
    return true;
  } catch (error) {
    console.error("Gmail email error:", error);
    return false;
  }
}

// Method 3: Custom SMTP
async function sendEmailWithSMTP(submission: ContactSubmission): Promise<boolean> {
  try {
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: EMAIL_CONFIG.to,
      subject: `New Contact Form Submission: ${submission.name}`,
      html: generateEmailHTML(submission),
      text: generateEmailText(submission),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully via SMTP:", info.messageId);
    return true;
  } catch (error) {
    console.error("SMTP email error:", error);
    return false;
  }
}

// Generate HTML email content
function generateEmailHTML(submission: ContactSubmission): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .message-box { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📧 New Contact Form Submission</h2>
          <p>Someone has contacted you through your portfolio website!</p>
        </div>
        
        <div class="field">
          <div class="label">👤 Name:</div>
          <div class="value">${submission.name}</div>
        </div>
        
        <div class="field">
          <div class="label">📧 Email:</div>
          <div class="value"><a href="mailto:${submission.email}">${submission.email}</a></div>
        </div>
        
        ${submission.phone ? `
        <div class="field">
          <div class="label">📱 Phone:</div>
          <div class="value">${submission.phone}</div>
        </div>
        ` : ''}
        
        ${submission.subject ? `
        <div class="field">
          <div class="label">📝 Subject:</div>
          <div class="value">${submission.subject}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <div class="label">💬 Message:</div>
          <div class="message-box">${submission.message.replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="field">
          <div class="label">⏰ Submitted:</div>
          <div class="value">${new Date(submission.timestamp).toLocaleString()}</div>
        </div>
        
        <div class="field">
          <div class="label">🌐 IP Address:</div>
          <div class="value">${submission.ip}</div>
        </div>
        
        <div class="footer">
          <p>This email was sent from your portfolio contact form.</p>
          <p>Submission ID: ${submission.id}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate plain text email content
function generateEmailText(submission: ContactSubmission): string {
  return `
New Contact Form Submission

Someone has contacted you through your portfolio website!

Name: ${submission.name}
Email: ${submission.email}
${submission.phone ? `Phone: ${submission.phone}` : ''}
${submission.subject ? `Subject: ${submission.subject}` : ''}

Message:
${submission.message}

Submitted: ${new Date(submission.timestamp).toLocaleString()}
IP Address: ${submission.ip}
Submission ID: ${submission.id}

---
This email was sent from your portfolio contact form.
  `;
}




