# WebTech CBT Practice Platform - Full Documentation (A-Z)

This document provides a complete overview of the "WebTech CBT Practice Platform," a full-stack system designed for university-level Node.js/Express coding exam simulation.

---

## 1. Project Overview
The platform allows students to practice coding exams in a realistic environment. It features a futuristic, glassmorphism-based UI, a triple-panel code editor, and a smart evaluation engine that checks for common Express.js mistakes.

---

## 2. Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS v4, Monaco Editor, Lucide Icons, Framer Motion, Axios.
- **Backend**: Node.js, Express.js, FS-Extra (for JSON file handling).
- **Database**: Local JSON files (`backend/data/`). No external DB required.
- **Styling**: Modern futuristic aesthetics with glassmorphism and custom animations.

---

## 3. Folder Structure
```text
/
├── backend/
│   ├── data/               # Question bank (questions.json)
│   ├── server.js           # Main Express server & evaluation logic
│   └── package.json        # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar and UI elements
│   │   ├── pages/          # Dashboard, Playground, Admin panels
│   │   ├── App.jsx         # Routing configuration
│   │   └── index.css       # Tailwind v4 styles & Glassmorphism
│   ├── vite.config.js      # Vite + Tailwind v4 config
│   ├── vercel.json         # SPA routing for Vercel
│   └── package.json        # Frontend dependencies
└── .gitignore              # Git ignore rules
```

---

## 4. Key Features

### A. Dashboard
- Mode selection: Practice vs. Exam Mode.
- Real-time question list fetching from the backend.
- Performance analytics cards (Avg score, Time spent, etc.).

### B. Coding Playground
- **Triple Editors**: Switch between `index.js`, `index.html`, and `data.json`.
- **Progressive Hint System**: Shows hints one-by-one to guide students.
- **Instruction Panel**: Displays the problem statement and expected API endpoints.

### C. Smart Evaluation Engine (In `backend/server.js`)
- Checks for:
    - Express app initialization.
    - Server port listening.
    - `express.json()` middleware usage.
    - Route name matching (Method + Path).
    - `fetch()` URL matching between frontend and backend.
    - Presence of response methods (`res.json`, `res.send`).
- **Score Calculation**: Automatically calculates a score out of 20.
- **Hinglish Explanations**: Provides solution logic in mixed Hindi-English.

### D. Admin Panel
- Interface to manually add new questions.
- Stores data directly into the `questions.json` file.

---

## 5. Deployment Instructions

### A. Backend (Render)
1. Push the code to GitHub.
2. In Render, create a **New Web Service**.
3. Set **Root Directory** to `backend`.
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. Render will provide a URL (e.g., `https://my-api.onrender.com`).

### B. Frontend (Vercel)
1. In Vercel, import the GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Select **Vite** as the framework.
4. **Environment Variables**: Add `VITE_API_URL` and set its value to your Render URL.
5. Click **Deploy**.

---

## 6. Environmental Variables
- **Frontend**:
    - `VITE_API_URL`: The URL of your deployed backend service.
- **Backend**:
    - `PORT`: Automatically set by Render (defaults to 10000).

---

## 7. How to Add Questions (Manually)
Update `backend/data/questions.json` with a new object:
```json
{
  "id": "unique-id",
  "title": "Problem Title",
  "difficulty": "Easy/Medium/Hard",
  "instructions": "Step by step instructions...",
  "starterCode": {
    "index.js": "starter code",
    "index.html": "html code",
    "data.json": "[]"
  },
  "expectedAPIs": [
    { "method": "GET", "path": "/api/test" }
  ],
  "hints": ["Hint 1", "Hint 2"],
  "solution": "Full solution code",
  "explanation": "Hinglish explanation here..."
}
```

---

## 8. Current Status
- ✅ Project structure established.
- ✅ Git initialized and pushed to GitHub.
- ✅ Local testing successful (20/20 scores verified).
- ✅ Deployment configurations (`vercel.json`, `VITE_API_URL` support) implemented.
