# 🎯 Greenhouse Tracker

> AI-Powered Job Application Manager - Track, Analyze, and Land Your Dream Job

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-brightgreen.svg)](https://www.mongodb.com/)

## 📖 Overview

**Greenhouse Tracker** is a full-stack web application that helps job seekers manage their job applications efficiently. Built with modern technologies and inspired by enterprise ATS platforms like Greenhouse and Lever, this application brings professional-grade job tracking tools to individual job seekers.

### ✨ Key Features (In Development)

- 🔐 **User Authentication** - Secure login and registration
- 📊 **Dashboard Analytics** - Visual insights into your job search progress
- ✅ **Application Tracking** - Track applications through different stages (Applied, Interview, Offer, Rejected)
- 🤖 **AI Resume Analyzer** *(Coming Soon)* - Analyze resume-job description match using LLMs
- 📝 **Cover Letter Generator** *(Coming Soon)* - Auto-generate personalized cover letters with AI
- 📈 **Analytics & Insights** - Charts and statistics about your job search
- 🔔 **Reminders & Notifications** *(Coming Soon)* - Never miss a follow-up

---

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Data visualization library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication & authorization
- **bcrypt** - Password hashing

### AI/ML (Coming Soon)
- **Groq API (Llama 3.3)** - LLM for resume analysis
- **OpenAI GPT** - Cover letter generation
- **Sentence Transformers** - Semantic similarity matching

---

## 📁 Project Structure

```
Greenhouse-Tracker/
├── client/                 # React Frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/      # API service calls
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node.js Backend
│   ├── models/           # MongoDB schemas
│   │   ├── User.js
│   │   └── Application.js
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, error handling
│   ├── config/           # Configuration
│   ├── server.js         # Entry point
│   ├── .env              # Environment variables
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v18.0 or higher)
- **MongoDB** (v6.0 or higher) - Local or MongoDB Atlas
- **npm** or **yarn**
- **Git**

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
JWT_SECRET=your_super_secret_jwt_key_change_this
GROQ_API_KEY=your_groq_api_key_here
```

**Start the backend server:**

```bash
npm run dev
```

Backend will run on: `http://localhost:3001`

### Step 3: Setup Frontend

**Open a NEW terminal:**

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Step 4: Verify Installation

- **Backend API**: Visit `http://localhost:3001` - Should show `{"message":"Server is working!"}`
- **Frontend**: Visit `http://localhost:5173` - Should show the Login page

---

## 🎯 Usage

### 1. Register an Account
- Go to `http://localhost:5173`
- Click "Register here"
- Fill in your name, email, and password
- Click "Create Account"

### 2. Login
- Enter your email and password
- Click "Login"
- You'll be redirected to the Dashboard

### 3. Dashboard Features
- **View Stats**: See total applications, interviews, offers, and rejections
- **Add Application**: Click "+ Add New Application" to track a new job
- **Track Progress**: Monitor all your applications in one place

---

## 📊 Current Development Status

### ✅ Completed (Day 2)
- [x] Project setup and configuration
- [x] Backend API structure
- [x] Frontend with React + Vite + Tailwind
- [x] User authentication UI (Login/Register pages)
- [x] Dashboard with stats cards
- [x] Responsive design
- [x] Routing system

### 🚧 In Progress (Day 3)
- [ ] Add Application form (modal)
- [ ] Backend API routes for CRUD operations
- [ ] MongoDB integration
- [ ] Display applications list
- [ ] Edit/Delete functionality

### 🔮 Upcoming Features (Day 4+)
- [ ] AI Resume Analyzer
- [ ] Cover Letter Generator with LLM
- [ ] Analytics dashboard with charts
- [ ] Email reminders
- [ ] Chrome extension for saving jobs
- [ ] Export data (CSV/PDF)
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are welcome! This is a learning project, so feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 API Endpoints (Coming Soon)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### AI Features (Coming Soon)
- `POST /api/ai/analyze-resume` - Analyze resume-JD match
- `POST /api/ai/generate-cover-letter` - Generate cover letter

---

## 🎨 Screenshots

### Login Page
Beautiful gradient design with clean UI

### Dashboard
Stats cards showing application metrics at a glance

### Application Tracker
Organized view of all job applications

*(Screenshots will be added as features are completed)*

---

## 🐛 Known Issues

- MongoDB connection not yet implemented
- Authentication currently uses local state (JWT integration pending)
- Add Application form is a placeholder (full functionality coming in Day 3)

---

## 📚 Learning Resources

This project was built while learning:
- Full-stack development with MERN stack
- Modern React patterns (Hooks, Context API)
- RESTful API design
- JWT authentication
- Tailwind CSS styling
- Git workflow and version control

---

## 👨‍💻 Author

**Alok Yadav**
- GitHub: [@CODEBRAKERBOYY](https://github.com/CODEBRAKERBOYY)
- LinkedIn: [Alok Yadav](https://linkedin.com/in/alokyadav)
- Portfolio: [Coming Soon]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by enterprise ATS platforms like **Greenhouse** and **Lever**
- UI design inspired by modern SaaS applications
- Built as part of learning full-stack development and AI integration

---

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/CODEBRAKERBOYY/Greenhouse-Tracker/issues) page
2. Open a new issue with detailed description
3. Contact via GitHub

---

## 🚀 Deployment (Coming Soon)

- **Frontend**: Vercel / Netlify
- **Backend**: Railway / Render
- **Database**: MongoDB Atlas

---

## 📈 Project Roadmap

### Phase 1 (Week 1) - Core Features ✅
- Basic CRUD operations
- User authentication
- Dashboard UI

### Phase 2 (Week 2) - AI Integration 🚧
- Resume analyzer
- Cover letter generator
- Job matching algorithm

### Phase 3 (Week 3) - Advanced Features 📋
- Analytics dashboard
- Email notifications
- Chrome extension

### Phase 4 (Week 4) - Polish & Deploy 🎯
- Testing
- Bug fixes
- Production deployment
