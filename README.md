# Personal Expense Tracker (MERN Stack)

A modern, full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
-   **Authentication**: Secure Register/Login with JWT.
-   **Dashboard**: Overview of income, expenses, and balance with visual charts.
-   **Transactions**: Add, edit, delete transactions. Filter by category and search by title.
-   **Responsive UI**: Built with Tailwind CSS and Glassmorphism design.

## Prerequisites
-   Node.js (v14 or later)
-   MongoDB Atlas Account (or local MongoDB)

## Installation Guide

### 1. Backend Setup
Navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (if not exists) and add your configuration:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:
```bash
npm run dev
# or
node server.js
```

### 2. Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm run dev
```

Open your browser and visit `http://localhost:5173`.

## Deployment
-   **Frontend**: Vercel (recommended) or Netlify.
-   **Backend**: Render, Railway, or Heroku.
-   **Database**: MongoDB Atlas.

## License
MIT
