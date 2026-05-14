const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve Frontend Static Files
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Helper to read data
const getData = (file) => {
    const filePath = path.join(__dirname, 'data', file);
    if (!fs.existsSync(filePath)) return [];
    return fs.readJsonSync(filePath);
};

// Routes
app.get('/api/questions', (req, res) => {
    const questions = getData('questions.json');
    // Hide solutions in list view
    const publicQuestions = questions.map(q => {
        const { solution, ...rest } = q;
        return rest;
    });
    res.json(publicQuestions);
});

app.get('/api/questions/:id', (req, res) => {
    const questions = getData('questions.json');
    const question = questions.find(q => q.id === req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
});

// Admin: Add/Edit questions
app.post('/api/admin/questions', (req, res) => {
    const questions = getData('questions.json');
    const newQuestion = { ...req.body, id: uuidv4() };
    questions.push(newQuestion);
    fs.writeJsonSync(path.join(__dirname, 'data', 'questions.json'), questions);
    res.json(newQuestion);
});

// Code Execution Endpoint
app.post('/api/execute', async (req, res) => {
    const { indexJs, indexHtml, dataJson, expectedAPIs } = req.body;
    
    let score = 0;
    let mistakes = [];
    
    // 1. Common Exam Mistake Checker
    if (!indexJs.includes("express()")) mistakes.push("Express app not initialized.");
    if (!indexJs.includes("listen(")) mistakes.push("Server is not listening on any port.");
    if (indexHtml.includes("fetch") && !indexJs.includes("app.get") && !indexJs.includes("app.post")) {
        mistakes.push("Frontend is fetching but no backend routes found.");
    }
    if (indexJs.includes("res.json") && !indexJs.includes("JSON.parse") && !indexJs.includes("fs.")) {
        mistakes.push("Sending JSON response but file reading logic might be missing.");
    }
    if (indexJs.includes("req.body") && !indexJs.includes("express.json()")) {
        mistakes.push("Using req.body but express.json() middleware is missing.");
    }

    // 2. Route Matching Logic
    expectedAPIs.forEach(api => {
        const method = api.method.toLowerCase();
        const routeRegex = new RegExp(`app\\.${method}\\(['"]${api.path}['"]`, 'i');
        
        if (!routeRegex.test(indexJs)) {
            mistakes.push(`Route Mismatch: Expected ${api.method} ${api.path}`);
        } else {
            // Check if it's sending a response
            const resRegex = new RegExp(`res\\.(json|send|end|status)`, 'i');
            if (!resRegex.test(indexJs)) {
                mistakes.push(`Route ${api.path} found but no response sent.`);
            } else {
                score += (20 / expectedAPIs.length);
            }
        }
    });

    // 3. fetch() URL matching
    if (indexHtml.includes("fetch('")) {
        const fetchMatch = indexHtml.match(/fetch\(['"]([^'"]+)['"]/);
        if (fetchMatch && !indexJs.includes(fetchMatch[1])) {
            mistakes.push(`fetch URL '${fetchMatch[1]}' does not match any backend route.`);
        }
    }

    res.json({
        score: Math.min(20, Math.round(score)),
        mistakes: [...new Set(mistakes)], // Deduplicate
        output: "Evaluation completed with smart checks.",
        success: mistakes.length === 0 && score >= 20
    });
});

// Catch-all middleware for SPA (Universal Fix)
app.use((req, res) => {
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Frontend not built. Please run "npm run build" in the frontend folder.');
    }
});

app.listen(PORT, () => {
    console.log(`All-in-one Server running on port ${PORT}`);
});
