const express = require('express');
const sgMail = require('@sendgrid/mail');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configure SendGrid (optional - will work without it)
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.log('⚠️ SendGrid API key not found - emails will be disabled');
}

// @route   POST /api/contact
// @desc    Send contact form message
// @access  Public
router.post('/', [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Save contact message to database
    const contactData = {
      firstName,
      lastName,
      email,
      phone: phone || '',
      subject,
      message,
      ipAddress: req.ip || req.connection.remoteAddress || '',
      userAgent: req.get('User-Agent') || ''
    };

    const contact = new Contact(contactData);
    await contact.save();

    // Send email to admin
    const emailContent = {
      to: process.env.ADMIN_EMAIL || 'sauravshubham903@gmail.com',
      from: {
        email: process.env.EMAIL_USER || 'sauravshubham903@gmail.com',
        name: 'Kommercen Contact Form'
      },
      replyTo: email,
      subject: `New Contact Form Submission: ${subject} (ID: ${contact._id})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
            <p style="color: #e0e0e0; margin: 10px 0 0 0;">Kommercen Customer Inquiry</p>
            <p style="color: #e0e0e0; margin: 5px 0 0 0; font-size: 14px;">Database ID: ${contact._id}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
                  <td style="padding: 8px 0; color: #333;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Date:</td>
                  <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString('en-US', { 
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })} IST</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Status:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <span style="background: #ffc107; color: #000; padding: 4px 8px; border-radius: 4px; font-size: 12px;">NEW</span>
                  </td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px;">
              <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea;">
                <p style="margin: 0; line-height: 1.6; color: #333; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <div style="margin-top: 25px; padding: 20px; background: #e3f2fd; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #1976d2; font-weight: bold;">
                💡 Quick Reply: Click "Reply" to respond directly to ${firstName}
              </p>
              <p style="margin: 5px 0 0 0; color: #1976d2; font-size: 14px;">
                📊 View in Admin Dashboard: <a href="https://kommercen.vercel.app/admin/contacts" style="color: #1976d2;">Admin Panel</a>
              </p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This email was sent from the Kommercen contact form at 
              <a href="https://kommercen.vercel.app/contact" style="color: #667eea;">kommercen.vercel.app/contact</a>
            </p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
              Message saved to database with ID: ${contact._id}
            </p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission - Kommercen (ID: ${contact._id})
        
        Contact Details:
        Name: ${firstName} ${lastName}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        Subject: ${subject}
        Date: ${new Date().toLocaleString('en-US', { 
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} IST
        Status: NEW
        
        Message:
        ${message}
        
        ---
        This email was sent from the Kommercen contact form.
        Reply directly to this email to respond to ${firstName}.
        Message saved to database with ID: ${contact._id}
      `
    };

    // Try to send admin email if SendGrid is configured
    if (process.env.SENDGRID_API_KEY) {
      try {
        await sgMail.send(emailContent);
        
        // Update contact record to mark email as sent
        contact.emailSent = true;
        contact.emailSentAt = new Date();
        await contact.save();

      } catch (emailError) {
        console.error('Failed to send admin email:', emailError.message);
        // Continue even if admin email fails
      }
    } else {
      console.log(`📧 Admin email skipped - SendGrid not configured. Contact ID: ${contact._id}`);
    }

    // Send confirmation email to customer
    const confirmationEmail = {
      to: email,
      from: {
        email: process.env.EMAIL_USER || 'sauravshubham903@gmail.com',
        name: 'Kommercen Support'
      },
      subject: 'Thank you for contacting Kommercen!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: #e0e0e0; margin: 10px 0 0 0;">We've received your message</p>
            <p style="color: #e0e0e0; margin: 5px 0 0 0; font-size: 14px;">Reference ID: ${contact._id}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Hi ${firstName}!</h2>
              <p style="color: #666; line-height: 1.6;">
                Thank you for reaching out to us. We've received your message regarding <strong>"${subject}"</strong> 
                and our team will get back to you within 24 hours.
              </p>
              <p style="color: #666; line-height: 1.6;">
                <strong>Reference ID:</strong> ${contact._id}<br>
                <strong>Subject:</strong> ${subject}<br>
                <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} IST
              </p>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">What happens next?</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>✅ Your message has been received and logged (ID: ${contact._id})</li>
                <li>📧 Our support team will review your inquiry</li>
                <li>⏰ You'll receive a response within 24 hours</li>
                <li>🔄 We'll work to resolve your query promptly</li>
              </ul>
            </div>

            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #2e7d32; margin-top: 0;">Need immediate assistance?</h3>
              <p style="color: #2e7d32; margin: 0;">
                📧 Email us at <strong>sauravshubham903@gmail.com</strong>
              </p>
            </div>

            <div style="text-align: center; margin-top: 25px;">
              <a href="https://kommercen.vercel.app" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 6px; 
                        font-weight: bold;
                        display: inline-block;">
                Continue Shopping
              </a>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Best regards,<br>
              <strong>The Kommercen Team</strong><br>
              <a href="https://kommercen.vercel.app" style="color: #667eea;">kommercen.vercel.app</a>
            </p>
          </div>
        </div>
      `,
      text: `
        Hi ${firstName}!
        
        Thank you for reaching out to us. We've received your message regarding "${subject}" 
        and our team will get back to you within 24 hours.
        
        Reference ID: ${contact._id}
        Subject: ${subject}
        Submitted: ${new Date().toLocaleString('en-US', { 
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} IST
        
        What happens next?
        ✅ Your message has been received and logged (ID: ${contact._id})
        📧 Our support team will review your inquiry
        ⏰ You'll receive a response within 24 hours
        🔄 We'll work to resolve your query promptly
        
        Need immediate assistance?
        📧 Email us at sauravshubham903@gmail.com
        
        Best regards,
        The Kommercen Team
        https://kommercen.vercel.app
      `
    };

    // Try to send customer confirmation email if SendGrid is configured
    if (process.env.SENDGRID_API_KEY) {
      try {
        await sgMail.send(confirmationEmail);
        console.log(`📧 Confirmation email sent to customer: ${email}`);
      } catch (emailError) {
        console.error('Failed to send customer confirmation email:', emailError.message);
        // Continue even if confirmation email fails
      }
    } else {
      console.log(`📧 Customer confirmation email skipped - SendGrid not configured`);
    }

    res.status(200).json({
      message: 'Message sent successfully! We\'ll get back to you soon.',
      success: true,
      contactId: contact._id,
      emailSent: contact.emailSent
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Handle SendGrid specific errors
    if (error.response?.body?.errors) {
      console.error('SendGrid error details:', error.response.body);
    }

    res.status(500).json({
      message: 'Failed to send message. Please try again later.',
      success: false
    });
  }
});

// @route   GET /api/contact/test
// @desc    Test email configuration
// @access  Private (Admin only)
router.get('/test', async (req, res) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(400).json({
        message: 'SendGrid API key not configured',
        success: false
      });
    }

    const testEmail = {
      to: process.env.ADMIN_EMAIL || 'sauravshubham903@gmail.com',
      from: {
        email: process.env.EMAIL_USER || 'sauravshubham903@gmail.com',
        name: 'Kommercen Test'
      },
      subject: 'Email Configuration Test - Kommercen',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">Email Configuration Test</h1>
          <p>This is a test email to verify that the email configuration is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
        </div>
      `,
      text: `Email Configuration Test - ${new Date().toISOString()}`
    };

    await sgMail.send(testEmail);

    res.json({
      message: 'Test email sent successfully!',
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      message: 'Failed to send test email',
      error: error.message,
      success: false
    });
  }
});

// @route   GET /api/contact/admin
// @desc    Get all contact messages (Admin only)
// @access  Private (Admin only)
router.get('/admin', auth, adminAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      subject,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const result = await Contact.search(search, {
      page: parseInt(page),
      limit: parseInt(limit),
      status,
      subject,
      sortBy,
      sortOrder
    });

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Failed to fetch contacts', success: false });
  }
});

// @route   GET /api/contact/admin/stats
// @desc    Get contact statistics (Admin only)
// @access  Private (Admin only)
router.get('/admin/stats', auth, adminAuth, async (req, res) => {
  try {
    const stats = await Contact.getStats();
    const recent = await Contact.getRecent(5);

    res.json({
      success: true,
      stats,
      recent
    });

  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({ message: 'Failed to fetch stats', success: false });
  }
});

// @route   GET /api/contact/admin/:id
// @desc    Get single contact message (Admin only)
// @access  Private (Admin only)
router.get('/admin/:id', auth, adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact message not found',
        success: false
      });
    }

    res.json({
      success: true,
      contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Failed to fetch contact', success: false });
  }
});

// @route   PUT /api/contact/admin/:id/status
// @desc    Update contact message status (Admin only)
// @access  Private (Admin only)
router.put('/admin/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!['new', 'read', 'replied', 'closed'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status value',
        success: false
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact message not found',
        success: false
      });
    }

    contact.status = status;
    if (adminNotes) contact.adminNotes = adminNotes;

    if (status === 'replied') {
      contact.repliedAt = new Date();
      contact.repliedBy = req.user._id;
    }

    await contact.save();

    res.json({
      message: 'Contact status updated successfully',
      success: true,
      contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ message: 'Failed to update status', success: false });
  }
});

// @route   DELETE /api/contact/admin/:id
// @desc    Delete contact message (Admin only)
// @access  Private (Admin only)
router.delete('/admin/:id', auth, adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact message not found',
        success: false
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Contact message deleted successfully',
      success: true
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Failed to delete contact', success: false });
  }
});

module.exports = router;
