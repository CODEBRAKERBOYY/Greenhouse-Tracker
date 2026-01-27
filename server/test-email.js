require('dotenv').config();
const { sendFollowUpReminder } = require('./services/emailService');

const testEmail = async () => {
  const testApp = {
    company: 'Google',
    position: 'Software Engineer',
    status: 'Applied',
    appliedDate: new Date(),
    jobUrl: 'https://careers.google.com',
  };
  
  console.log('📧 Sending test email to:', process.env.EMAIL_USER);
  const result = await sendFollowUpReminder(process.env.EMAIL_USER, testApp);
  console.log('Test result:', result);
  process.exit(0);
};

testEmail();