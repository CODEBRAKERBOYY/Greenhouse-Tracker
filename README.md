# 🎯 Greenhouse Tracker

> AI-Powered Job Application Manager - Track, Analyze, and Land Your Dream Job

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-brightgreen.svg)](https://www.mongodb.com/)

## 📖 Overview

**Greenhouse Tracker** is a comprehensive full-stack web application designed to revolutionize how job seekers manage their job search. Built with the MERN stack and enhanced with AI capabilities, this platform combines professional-grade tracking tools with intelligent analytics to help you land your dream job.

### ✨ Key Features

- 🔐 **User Authentication** - Secure login and registration with JWT
- 📊 **Advanced Dashboard** - Real-time stats and application overview
- ✅ **Smart Application Tracking** - Track applications through stages (Applied, Interview, Offer, Rejected)
- 🔄 **Quick Status Updates** - One-click status changes with dropdown menu
- 🤖 **AI Resume Analyzer** - Analyze resume-job description match using Groq LLM (Llama 3.3)
- ✍️ **AI Cover Letter Generator** - Auto-generate personalized cover letters with AI
- 📈 **Analytics Dashboard** - Beautiful charts and visualizations showing job search insights
- 🎯 **Key Insights** - Personalized recommendations based on your application data
- 📉 **Trend Analysis** - Monthly trends and company-wise application tracking
- ⚡ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library with Hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Beautiful data visualization library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure authentication & authorization
- **bcrypt** - Password hashing and security

### AI/ML Integration
- **Groq API (Llama 3.3)** - LLM for intelligent resume analysis
- **OpenAI GPT** - Advanced cover letter generation
- **Natural Language Processing** - Semantic matching algorithms

---

## 📁 Project Structure

```
Greenhouse-Tracker/
├── client/                 # React Frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── AddApplicationForm.jsx
│   │   │   ├── EditApplicationForm.jsx
│   │   │   ├── ResumeAnalyzer.jsx
│   │   │   └── CoverLetterGenerator.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Analytics.jsx
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node.js Backend
│   ├── models/           # MongoDB schemas
│   │   ├── User.js
│   │   └── Application.js
│   ├── routes/           # API route handlers
│   │   ├── applications.js
│   │   ├── analytics.js
│   │   └── ai.js
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, error handling
│   ├── config/           # Configuration files
│   ├── server.js         # Entry point
│   ├── .env              # Environment variables
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v18.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6.0 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/CODEBRAKERBOYY/Greenhouse-Tracker.git
cd Greenhouse-Tracker
```

### Step 2: Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
touch .env
```

**Add the following to `.env`:**

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/greenhouse-tracker
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

**Start the backend server:**

```bash
npm run dev
```

✅ Backend will run on: `http://localhost:3001`

### Step 3: Setup Frontend

**Open a NEW terminal window:**

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend will run on: `http://localhost:5173`

### Step 4: Verify Installation

- **Backend API**: Visit `http://localhost:3001` - Should display `{"message":"Server is working!"}`
- **Frontend**: Visit `http://localhost:5173` - Should show the Login page
- **Analytics API**: Visit `http://localhost:3001/api/analytics/overview` - Should return JSON data

---

## 🎯 Usage Guide

### 1. Create Your Account
1. Navigate to `http://localhost:5173`
2. Click "Register here" link
3. Fill in your details (name, email, password)
4. Click "Create Account"

### 2. Login
1. Enter your registered email and password
2. Click "Login"
3. You'll be redirected to your personalized Dashboard

### 3. Dashboard Features

#### **Quick Stats**
- View total applications at a glance
- See interview conversion rate
- Track offers received
- Monitor rejection rate

#### **Add New Application**
- Click "+ Add New Application"
- Fill in job details (company, position, salary, location)
- Add job URL and notes
- Submit to start tracking

#### **Quick Status Updates**
- Click the 🔄 button on any application
- Select new status from dropdown:
  - 📝 Applied
  - 💼 Interview
  - 🎉 Offer
  - ❌ Rejected

#### **AI-Powered Features**
- **🤖 Resume Analyzer**: Click to analyze job-resume match
- **✍️ Cover Letter Generator**: Auto-generate tailored cover letters
- **✏️ Edit**: Modify application details
- **🗑️ Delete**: Remove application

### 4. Analytics Dashboard

Click "📊 View Analytics" to access:

- **Stats Overview**: Total applications, rates, and insights
- **Key Insights Banner**: Personalized tips based on your data
- **Applications Over Time**: Line chart showing application trends
- **Status Distribution**: Pie chart of application statuses
- **Top Companies**: Bar chart of companies you've applied to
- **Monthly Trends**: Multi-line chart tracking status changes over time
- **Success Tips**: Actionable advice to improve your job search

---

## 📊 Feature Showcase

### ✅ Completed Features

#### **Core Application Management**
- [x] Full CRUD operations for job applications
- [x] User authentication with JWT
- [x] Secure password hashing with bcrypt
- [x] Application status tracking
- [x] Quick status update dropdown
- [x] Responsive dashboard UI

#### **Analytics & Insights**
- [x] Advanced analytics dashboard
- [x] Interactive charts (Line, Pie, Bar)
- [x] Monthly trend analysis
- [x] Company-wise application tracking
- [x] Success rate calculations
- [x] Personalized insights and recommendations

#### **AI Features**
- [x] AI-powered resume analyzer
- [x] Intelligent cover letter generator
- [x] Job-resume matching algorithm

#### **Backend Infrastructure**
- [x] RESTful API architecture
- [x] MongoDB database integration
- [x] Analytics aggregation endpoints
- [x] Error handling middleware
- [x] Secure authentication routes

### 🔮 Upcoming Features (Phase 3 & 4)

#### **Email Notifications** *(Coming Soon)*
- [ ] Automated follow-up reminders
- [ ] Interview preparation notifications
- [ ] Application deadline alerts
- [ ] Weekly progress summaries
- [ ] Customizable notification preferences

#### **Chrome Extension** *(Coming Soon)*
- [ ] One-click job saving from LinkedIn, Indeed, Glassdoor
- [ ] Auto-extract job details (title, company, description)
- [ ] Quick add popup interface
- [ ] Sync with main application
- [ ] Browser action badge with application count

#### **Additional Features**
- [ ] Export data (CSV/PDF)
- [ ] Dark mode toggle
- [ ] Advanced search and filters
- [ ] Calendar integration
- [ ] Interview preparation checklist
- [ ] Salary negotiation calculator

---

## 📝 API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
GET    /api/auth/me                - Get current user profile
```

### Applications
```
GET    /api/applications           - Get all user applications
POST   /api/applications           - Create new application
PUT    /api/applications/:id       - Update application by ID
DELETE /api/applications/:id       - Delete application by ID
```

### Analytics
```
GET    /api/analytics/overview     - Get analytics overview (stats, charts)
GET    /api/analytics/monthly      - Get monthly trend data
```

### AI Features
```
POST   /api/ai/analyze-resume      - Analyze resume-JD match score
POST   /api/ai/generate-cover-letter - Generate AI cover letter
```

---

## 🎨 Screenshots

### 🔐 Login Page
Beautiful gradient design with secure authentication
- Clean, modern UI
- Form validation
- Responsive design

### 📊 Dashboard
Comprehensive overview of your job search
- Real-time stats cards
- Application list with quick actions
- Status badges and indicators
- Quick status update dropdown

### 📈 Analytics Dashboard
Deep insights into your job search journey
- 4 key metric cards
- Key insights banner with personalized tips
- Applications over time (line chart)
- Status distribution (pie chart)
- Top companies applied (bar chart)
- Monthly trends (multi-line chart)
- Success tips section

### 🤖 AI Features
Intelligent tools to boost your applications
- Resume analyzer with match scores
- AI-powered cover letter generator
- Job description analysis

---

## 🐛 Known Issues & Limitations

- Email notifications feature in development
- Chrome extension in planning phase
- Dark mode not yet implemented
- CSV/PDF export pending

---

## 📚 Learning Journey

This project was built while learning and implementing:

### Technical Skills
- ✅ Full-stack development with MERN stack
- ✅ Modern React patterns (Hooks, Context API, Custom Hooks)
- ✅ RESTful API design and best practices
- ✅ JWT authentication and security
- ✅ MongoDB aggregation pipelines
- ✅ Tailwind CSS responsive design
- ✅ Data visualization with Recharts
- ✅ Git workflow and version control
- ✅ API integration (Groq, OpenAI)

### Soft Skills
- ✅ Project planning and roadmap creation
- ✅ Feature prioritization
- ✅ Problem-solving and debugging
- ✅ Documentation writing
- ✅ User experience design

---

## 🤝 Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation, we appreciate your help.

### How to Contribute

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 👨‍💻 Author

**Alok Yadav**

- 🐙 GitHub: [@CODEBRAKERBOYY](https://github.com/CODEBRAKERBOYY)
- 💼 LinkedIn: [Alok Yadav](https://linkedin.com/in/alokyadav)
- 📧 Email: [your.email@example.com]
- 🌐 Portfolio: [Coming Soon]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Alok Yadav

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

- 🏢 **Greenhouse** and **Lever** - Inspiration for enterprise-grade ATS design
- 🎨 **Modern SaaS Applications** - UI/UX design inspiration
- 🤖 **Groq & OpenAI** - AI capabilities integration
- 👥 **Open Source Community** - Libraries and tools used
- 📚 **Learning Resources** - Tutorials and documentation that helped

---

## 📞 Support & Contact

Need help? Have questions? Found a bug?

1. 📖 Check the [Wiki](https://github.com/CODEBRAKERBOYY/Greenhouse-Tracker/wiki) (coming soon)
2. 🐛 Browse [Issues](https://github.com/CODEBRAKERBOYY/Greenhouse-Tracker/issues)
3. ✨ Create a [New Issue](https://github.com/CODEBRAKERBOYY/Greenhouse-Tracker/issues/new)
4. 💬 Contact via GitHub Discussions

---

## 🚀 Deployment Guide (Coming Soon)

### Recommended Platforms

#### Frontend
- **Vercel** - Optimal for React/Vite apps
- **Netlify** - Easy setup with continuous deployment
- **GitHub Pages** - Free static hosting

#### Backend
- **Railway** - Modern platform for backend services
- **Render** - Free tier with auto-deploy
- **Heroku** - Classic PaaS solution

#### Database
- **MongoDB Atlas** - Managed MongoDB hosting
  - Free tier available (512MB storage)
  - Automatic backups
  - High availability

---

## 📈 Project Roadmap

### ✅ Phase 1 (Week 1-2) - Core Features - COMPLETED
- [x] Project setup and architecture
- [x] Backend API with Express & MongoDB
- [x] Frontend with React, Vite, Tailwind
- [x] User authentication (login/register)
- [x] Dashboard with real-time stats
- [x] Full CRUD operations for applications
- [x] Responsive UI design

### ✅ Phase 2 (Week 3) - AI Integration - COMPLETED
- [x] AI Resume Analyzer with Groq API
- [x] Cover Letter Generator with LLM
- [x] Job-resume matching algorithm
- [x] AI features integration in UI

### ✅ Phase 3a (Week 4) - Analytics Dashboard - COMPLETED
- [x] Advanced analytics page
- [x] Data visualization with Recharts
- [x] Multiple chart types (Line, Pie, Bar)
- [x] Monthly trend analysis
- [x] Key insights and recommendations
- [x] Quick status update feature

### 🚧 Phase 3b (Week 5) - Advanced Features - IN PROGRESS
- [ ] Email notification system
  - [ ] Nodemailer integration
  - [ ] Cron job scheduler
  - [ ] Follow-up reminders
  - [ ] Interview alerts
- [ ] Chrome Extension
  - [ ] Extension manifest setup
  - [ ] Content script for job sites
  - [ ] Quick add popup
  - [ ] Background service worker

### 📋 Phase 4 (Week 6) - Polish & Deploy
- [ ] Comprehensive testing
- [ ] Bug fixes and optimization
- [ ] Performance improvements
- [ ] Production deployment
- [ ] Documentation completion
- [ ] User feedback collection

---

## 🎯 Success Metrics

### Current Achievements
- ✅ **100% Feature Completion** for Phases 1-3a
- ✅ **5+ Charts** in analytics dashboard
- ✅ **AI Integration** with 2 major features
- ✅ **Responsive Design** across all devices
- ✅ **Professional UI/UX** with modern design patterns

### Goals
- 🎯 Help **1000+ job seekers** track their applications
- 🎯 Achieve **95%+ uptime** in production
- 🎯 Maintain **<2s page load time**
- 🎯 Gather **100+ user testimonials**

---

## 💡 Tips for Job Seekers

Based on analytics and best practices:

### Application Strategy
1. **Quality over Quantity**: Aim for 20% interview rate
2. **Diversify**: Apply to 10+ different companies
3. **Follow Up**: Contact recruiters 1-2 weeks after applying
4. **Customize**: Tailor each resume and cover letter
5. **Track Everything**: Use this app to monitor all applications

### Using Greenhouse Tracker Effectively
- Update application status immediately
- Use AI tools for every application
- Review analytics weekly
- Set reminders for follow-ups
- Track what works and iterate

---

## 🌟 Star History

If this project helped you, please consider giving it a ⭐ on GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=CODEBRAKERBOYY/Greenhouse-Tracker&type=Date)](https://star-history.com/#CODEBRAKERBOYY/Greenhouse-Tracker&Date)

---

## 📊 Project Stats

- **Lines of Code**: 5000+
- **Components**: 15+
- **API Endpoints**: 10+
- **Charts**: 5
- **Development Time**: 4 weeks
- **Technologies Used**: 15+

---

**Built with ❤️ by Alok Yadav**

*Empowering job seekers with intelligent tools for career success*

---

### 🔗 Quick Links

- [📖 Documentation](https://github.com/CODEBRAKERBOYY/Greenhouse-Tracker/wiki)
- [🐛 Report Bug](https://github.com/CODEBRAKERBOYY/Greenhouse-Tracker/issues/new?labels=bug)
- [✨ Request Feature](https://github.com/CODEBRAKERBOYY/Greenhouse-Tracker/issues/new?labels=enhancement)
- [💬 Discussions](https://github.com/CODEBRAKERBOYY/Greenhouse-Tracker/discussions)

---

**Last Updated**: January 24, 2026  
**Version**: 1.0.0  
**Status**: Active Development
