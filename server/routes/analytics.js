const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// GET /api/analytics/overview - Get all analytics data
router.get('/overview', async (req, res) => {
  try {
    const applications = await Application.find();

    // Status distribution
    const statusData = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    // Applications over time (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const timelineData = applications
      .filter(app => new Date(app.appliedDate) >= sixMonthsAgo)
      .reduce((acc, app) => {
        const date = new Date(app.appliedDate).toLocaleDateString('en-US');
        const existing = acc.find(item => item.date === date);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({ date, count: 1 });
        }
        return acc;
      }, [])
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Applications per company
    const companyData = Object.entries(
      applications.reduce((acc, app) => {
        acc[app.company] = (acc[app.company] || 0) + 1;
        return acc;
      }, {})
    )
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate success rates
    const totalApps = applications.length;
    const interviews = applications.filter(a => a.status === 'Interview').length;
    const offers = applications.filter(a => a.status === 'Offer').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;

    const stats = {
      total: totalApps,
      interviews,
      offers,
      rejected,
      interviewRate: totalApps > 0 ? ((interviews / totalApps) * 100).toFixed(1) : 0,
      offerRate: totalApps > 0 ? ((offers / totalApps) * 100).toFixed(1) : 0,
      rejectionRate: totalApps > 0 ? ((rejected / totalApps) * 100).toFixed(1) : 0,
    };

    res.json({
      success: true,
      data: {
        stats,
        statusData,
        timelineData,
        companyData,
      },
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
});

// GET /api/analytics/monthly - Get monthly trends
router.get('/monthly', async (req, res) => {
  try {
    const applications = await Application.find();

    const monthlyData = applications.reduce((acc, app) => {
      const month = new Date(app.appliedDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      
      if (!acc[month]) {
        acc[month] = { month, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
      }
      acc[month][app.status] = (acc[month][app.status] || 0) + 1;
      
      return acc;
    }, {});

    const result = Object.values(monthlyData).sort((a, b) => 
      new Date(a.month) - new Date(b.month)
    );

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Monthly Analytics Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch monthly data' });
  }
});

module.exports = router;