const cron = require('node-cron');
const Application = require('../models/Application');
const User = require('../models/User');
const { sendFollowUpReminder, sendInterviewReminder, sendWeeklySummary } = require('./emailService');

// Check for applications needing follow-up (runs daily at 9 AM)
const scheduleFollowUpReminders = () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('🔔 Checking for follow-up reminders...');
    
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      // Find applications applied 7 days ago with status "Applied"
      const applications = await Application.find({
        status: 'Applied',
        appliedDate: {
          $gte: new Date(sevenDaysAgo.setHours(0, 0, 0, 0)),
          $lte: new Date(sevenDaysAgo.setHours(23, 59, 59, 999))
        }
      }).populate('user');
      
      for (const app of applications) {
        if (app.user && app.user.email) {
          await sendFollowUpReminder(app.user.email, app);
        }
      }
      
      console.log(`✅ Sent ${applications.length} follow-up reminders`);
    } catch (error) {
      console.error('❌ Error in follow-up scheduler:', error);
    }
  });
};

// Check for upcoming interviews (runs daily at 8 AM)
const scheduleInterviewReminders = () => {
  cron.schedule('0 8 * * *', async () => {
    console.log('🔔 Checking for interview reminders...');
    
    try {
      // Find applications with Interview status
      const applications = await Application.find({
        status: 'Interview'
      }).populate('user');
      
      for (const app of applications) {
        if (app.user && app.user.email) {
          await sendInterviewReminder(app.user.email, app);
        }
      }
      
      console.log(`✅ Sent ${applications.length} interview reminders`);
    } catch (error) {
      console.error('❌ Error in interview scheduler:', error);
    }
  });
};

// Send weekly summary (runs every Monday at 9 AM)
const scheduleWeeklySummary = () => {
  cron.schedule('0 9 * * 1', async () => {
    console.log('🔔 Sending weekly summaries...');
    
    try {
      const users = await User.find();
      
      for (const user of users) {
        const applications = await Application.find({ user: user._id });
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const thisWeekApps = applications.filter(app => 
          new Date(app.appliedDate) >= oneWeekAgo
        );
        
        const stats = {
          totalApplications: applications.length,
          interviews: applications.filter(a => a.status === 'Interview').length,
          offers: applications.filter(a => a.status === 'Offer').length,
          thisWeek: thisWeekApps.length
        };
        
        await sendWeeklySummary(user.email, stats);
      }
      
      console.log(`✅ Sent weekly summaries to ${users.length} users`);
    } catch (error) {
      console.error('❌ Error in weekly summary scheduler:', error);
    }
  });
};

// Initialize all schedulers
const initializeSchedulers = () => {
  if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
    console.log('📅 Initializing notification schedulers...');
    scheduleFollowUpReminders();
    scheduleInterviewReminders();
    scheduleWeeklySummary();
    console.log('✅ Notification schedulers initialized');
  } else {
    console.log('⏸️  Email notifications disabled');
  }
};

module.exports = { initializeSchedulers };