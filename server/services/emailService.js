const nodemailer = require('nodemailer');

// Create transporter (using Gmail as example)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your-email@gmail.com
    pass: process.env.EMAIL_PASSWORD, // your app password
  },
});

const sendFollowUpReminder = async (userEmail, application) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Follow up: ${application.position} at ${application.company}`,
    html: `
      <h2>Time to Follow Up!</h2>
      <p>Don't forget to follow up on your application:</p>
      <ul>
        <li><strong>Company:</strong> ${application.company}</li>
        <li><strong>Position:</strong> ${application.position}</li>
        <li><strong>Applied:</strong> ${new Date(application.appliedDate).toLocaleDateString()}</li>
      </ul>
      <p>Good luck!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Follow-up email sent successfully');
  } catch (error) {
    console.error('Email error:', error);
  }
};

const sendStatusChangeNotification = async (userEmail, application, oldStatus, newStatus) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Application Status Update: ${application.company}`,
    html: `
      <h2>Your Application Status Changed!</h2>
      <p><strong>${application.position}</strong> at <strong>${application.company}</strong></p>
      <p>Status: <span style="color: red;">${oldStatus}</span> → <span style="color: green;">${newStatus}</span></p>
      ${newStatus === 'Interview' ? '<p>🎉 Congratulations! Time to prepare for your interview!</p>' : ''}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
  }
};

module.exports = {
  sendFollowUpReminder,
  sendStatusChangeNotification,
};