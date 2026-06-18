const nodemailer = require('nodemailer');

const emailConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);

const transporter = emailConfigured
  ? nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  : null;

if (transporter) {
  transporter.verify((error) => {
    if (error) {
      console.error('❌ Email service error:', error);
    } else {
      console.log('✅ Email service ready');
    }
  });
}

const sendMail = async (mailOptions) => {
  if (!transporter) {
    console.log('⏸️  Email service skipped: EMAIL_USER and EMAIL_PASSWORD are not configured');
    return { success: false, error: 'Email is not configured' };
  }

  await transporter.sendMail(mailOptions);
  return { success: true };
};

// Send follow-up reminder email
const sendFollowUpReminder = async (userEmail, application) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `🔔 Follow-up Reminder: ${application.company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">🎯 Greenhouse Tracker</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Time to Follow Up!</h2>
          <p style="color: #4b5563; font-size: 16px;">
            Don't let your application to <strong>${application.company}</strong> go cold!
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #6366f1; margin-top: 0;">Application Details</h3>
            <p><strong>Position:</strong> ${application.position}</p>
            <p><strong>Company:</strong> ${application.company}</p>
            <p><strong>Status:</strong> ${application.status}</p>
            <p><strong>Applied:</strong> ${new Date(application.appliedDate).toLocaleDateString()}</p>
          </div>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h4 style="color: #1e40af; margin-top: 0;">💡 Follow-up Tips:</h4>
            <ul style="color: #1e3a8a;">
              <li>Send a polite email checking on your application status</li>
              <li>Mention your continued interest in the position</li>
              <li>Highlight a key skill relevant to the role</li>
              <li>Keep it brief and professional</li>
            </ul>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
          <p>© 2026 Greenhouse Tracker | Built with ❤️ by Alok Yadav</p>
        </div>
      </div>
    `,
  };

  try {
    await sendMail(mailOptions);
    console.log(`✅ Follow-up reminder sent to ${userEmail} for ${application.company}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send interview preparation reminder
const sendInterviewReminder = async (userEmail, application) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `🎯 Interview Preparation: ${application.company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">💼 Interview Alert!</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Congratulations on Your Interview!</h2>
          <p style="color: #4b5563; font-size: 16px;">
            You have an interview with <strong>${application.company}</strong>
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981; margin-top: 0;">Interview Details</h3>
            <p><strong>Position:</strong> ${application.position}</p>
            <p><strong>Company:</strong> ${application.company}</p>
            ${application.location ? `<p><strong>Location:</strong> ${application.location}</p>` : ''}
          </div>
          
          <div style="background: #d1fae5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
            <h4 style="color: #065f46; margin-top: 0;">📝 Preparation Checklist:</h4>
            <ul style="color: #064e3b;">
              <li>Research the company and recent news</li>
              <li>Review the job description and your resume</li>
              <li>Prepare answers to common interview questions</li>
              <li>Prepare questions to ask the interviewer</li>
              <li>Plan your outfit and route</li>
            </ul>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
          <p>Good luck! 🍀</p>
          <p>© 2026 Greenhouse Tracker</p>
        </div>
      </div>
    `,
  };

  try {
    await sendMail(mailOptions);
    console.log(`✅ Interview reminder sent to ${userEmail} for ${application.company}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send weekly summary email
const sendWeeklySummary = async (userEmail, stats) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: '📊 Your Weekly Job Search Summary',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">📊 Weekly Summary</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Your Week in Review</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #1e40af; font-size: 32px; margin: 0;">${stats.totalApplications}</h3>
              <p style="color: #1e3a8a; margin: 5px 0;">Total</p>
            </div>
            <div style="background: #d1fae5; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #065f46; font-size: 32px; margin: 0;">${stats.interviews}</h3>
              <p style="color: #064e3b; margin: 5px 0;">Interviews</p>
            </div>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
          <p>© 2026 Greenhouse Tracker</p>
        </div>
      </div>
    `,
  };

  try {
    await sendMail(mailOptions);
    console.log(`✅ Weekly summary sent to ${userEmail}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendFollowUpReminder,
  sendInterviewReminder,
  sendWeeklySummary,
};
