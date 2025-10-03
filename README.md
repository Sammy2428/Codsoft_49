# 🎯 Online Quiz Maker

A full-stack web application for creating and taking interactive quizzes. Built with React, Node.js, and MongoDB.

![Quiz Maker](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2-purple)

## ✨ Features

- 👤 **User Authentication** - Secure registration and login system
- 📝 **Quiz Creation** - Create custom quizzes with multiple questions
- 🎯 **Quiz Taking** - Interactive quiz interface with real-time progress
- 📊 **Results & Analytics** - Detailed scoring and performance insights
- 🏆 **User Dashboard** - Personal statistics and quiz management
- 📱 **Responsive Design** - Optimized for all devices
- 🎨 **Modern UI** - Clean interface with Bootstrap styling

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Bootstrap 5** & React Bootstrap
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password security

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sammy2428/Codsoft_49.git
   cd Codsoft_49
2. Setup Backend
    cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev 
 
3.Setup Frontend
cd client
npm install
npm start

4.Access the application

Frontend: http://localhost:3000

Backend API: http://localhost:5000

Codsoft_49/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API services
│   │   └── styles/        # CSS files
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js Backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   └── server.js
└── README.md

🔧 Configuration
Environment Variables
Create a .env file in the server directory:
MONGODB_URI=mongodb://localhost:27017/quizmaker
JWT_SECRET=your_super_secure_jwt_secret_here
PORT=5000
NODE_ENV=development

🎮 Usage

1.Register a new account or Login to existing account

2.Create quizzes with multiple choice questions

3.Take quizzes from the public library

4.View results with detailed performance analysis

5.Track progress on your personal dashboard

📸 Screenshots 
<img width="461" height="429" alt="Screenshot 2025-09-28 222813" src="https://github.com/user-attachments/assets/47ce7c74-de7c-43ff-908a-9804e0412b45" />
<img width="929" height="866" alt="Screenshot 2025-09-28 230202" src="https://github.com/user-attachments/assets/5fd5a58a-624b-4789-a572-2e86f52eca98" />
<img width="1920" height="1080" alt="Screenshot (171)" src="https://github.com/user-attachments/assets/1c69c6cc-be93-4e15-8986-669a45939b02" />

🔌 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
GET	/api/quizzes	Get all quizzes
POST	/api/quizzes	Create new quiz
GET	/api/quizzes/:id	Get specific quiz
🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Sammy2428

GitHub:https://github.com/Sammy2428/Codsoft_49

🙏 Acknowledgments

React community for excellent documentation

Bootstrap team for the UI framework

MongoDB for robust database solutions

CodSoft for the internship opportunity


