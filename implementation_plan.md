# Personal Expense Tracker - MERN Stack Implementation Plan

This document outlines the architecture, features, and step-by-step guide to building a modern, high-performance Personal Expense Tracker.

## 1. Project Architecture

### Tech Stack
-   **Frontend**: React (Vite), Tailwind CSS (Styling), Framer Motion (Animations), Recharts (Charts), Axios (API), React Router DOM (Routing).
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Mongoose ODM).
-   **Authentication**: JWT (JSON Web Tokens), bcryptjs (Password Hashing).

### Directory Structure

```
root/
├── backend/
│   ├── config/             # Database connection
│   ├── controllers/        # Request handling logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes definition
│   ├── middleware/         # Auth & Error handling
│   ├── utils/              # Helper functions
│   ├── server.js           # Entry point
│   └── .env                # Environment variables
└── frontend/
    ├── src/
    │   ├── assets/         # Images, icons
    │   ├── components/     # Reusable UI components
    │   │   ├── Dashboard/
    │   │   ├── Transactions/
    │   │   └── Shared/     # Buttons, Inputs, Layouts
    │   ├── context/        # Global State (Auth, GlobalStore)
    │   ├── hooks/          # Custom hooks (useFetch, useAuth)
    │   ├── pages/          # Page views (Login, Dashboard, etc.)
    │   ├── utils/          # API config, formatters
    │   ├── App.jsx         # Main component with Routes
    │   └── main.jsx        # Entry point
```

## 2. Key Features & Enhancements

### UI/UX (The "Wow" Factor)
-   **Glassmorphism**: Use translucent backgrounds with blur effects for cards.
-   **Dark Mode**: Native support via Tailwind.
-   **Interactive Charts**: Doughnut charts for categories, Line charts for trends.
-   **Micro-interactions**: Hover effects, smooth page transitions using Framer Motion.

### Advanced Features
-   **Smart Categorization**: Simple keyword matching to suggest categories.
-   **Export Data**: functionality to CSV/PDF (using `jspdf` or `react-csv`).
-   **Budget Alerts**: Visual indicators when category spending exceeds limits.

## 3. Implementation Steps

### Phase 1: Backend Setup (Foundation)
1.  **Initialize**: Setup Express, install dependencies (`cors`, `dotenv`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `express-validator`).
2.  **Database**: Connect to MongoDB Atlas.
3.  **Models**:
    -   `User`: name, email, password, createdAt.
    -   `Transaction`: userId, title, amount, category, date, description, type (income/expense).
4.  **Auth API**: Register, Login, Get User (Protected).
5.  **Transaction API**: CRUD operations with filtering/pagination logic.

### Phase 2: Frontend Setup (UI Skeleton)
1.  **Vite + Tailwind**: Initialize project, configure Tailwind.
2.  **Routing**: Setup `react-router-dom` for `/login`, `/register`, `/dashboard`, `/transactions`.
3.  **State Management**: Create `AuthContext` to handle user session.

### Phase 3: Core Features (Functionality)
1.  **Authentication**: Build sleek Login/Register forms with validation.
2.  **Dashboard**: Fetch summary data (total income/expense, balance). Render Charts.
3.  **Transaction Management**: Add/Edit/Delete forms. List view with filters.

### Phase 4: Polish & Advanced (The "Extra Mile")
1.  **Animations**: Add entry animations for lists and route transitions.
2.  **Optimization**: Implement `React.lazy` for routes, debounce search input.
3.  **Deployment**: Vercel (Frontend), Render/Railway (Backend).

## 4. Key Code Snippets

*(See the chat response for specific code examples)*
