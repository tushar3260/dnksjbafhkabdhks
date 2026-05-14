const fs = require('fs');

const questions = [];

// Helper to generate styled HTML with placeholders
const generateHTML = (title, path, headers) => {
    const headRow = headers.map(h => `<th>${h}</th>`).join('');
    
    return `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <style>
        body{ font-family: Arial; margin: 30px; background-color: #f5f5f5; }
        button{ padding: 10px 20px; background-color: blue; color: white; border: none; border-radius: 5px; cursor: pointer; }
        table{ width: 100%; margin-top: 20px; border-collapse: collapse; background-color: white; }
        table, th, td{ border: 1px solid #ccc; }
        th, td{ padding: 12px; text-align: center; }
        th{ background-color: #007bff; color: white; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    
    <!-- Write Button here -->

    <table id="myTable">
        <thead>
            <tr>${headRow}</tr>
        </thead>
        <tbody></tbody>
    </table>
    
    <script>
        async function getData(){
            // Write Fetch Logic here
        }
    </script>
</body>
</html>`;
};

// Domain list for variety
const domains = [
    { title: "Student Record", path: "/students", headers: ["ID", "Name", "Course"], data: [{id:1, name:"Rahul", course:"CS"}] },
    { title: "Teacher List", path: "/teachers", headers: ["ID", "Name", "Dept"], data: [{id:1, name:"Dr. Aman", dept:"Math"}] },
    { title: "Library", path: "/books", headers: ["ID", "Title", "Author"], data: [{id:1, title:"JS Guide", author:"MDN"}] },
    { title: "Inventory", path: "/items", headers: ["ID", "Name", "Stock"], data: [{id:1, name:"Milk", stock:50}] },
    { title: "Hospital", path: "/doctors", headers: ["ID", "Name", "Specialty"], data: [{id:1, name:"Dr. Ria", specialty:"Skin"}] },
    { title: "Products", path: "/products", headers: ["ID", "Name", "Price"], data: [{id:1, name:"Laptop", price:50000}] },
    { title: "City Info", path: "/cities", headers: ["ID", "Name", "State"], data: [{id:1, name:"Mumbai", state:"MH"}] },
    { title: "Vehicles", path: "/vehicles", headers: ["ID", "Model", "Brand"], data: [{id:1, model:"Civic", brand:"Honda"}] },
    { title: "Flights", path: "/flights", headers: ["ID", "Number", "Dest"], data: [{id:1, number:"AI101", dest:"NY"}] },
    { title: "Movies", path: "/movies", headers: ["ID", "Title", "Rating"], data: [{id:1, title:"Dangal", rating:9}] }
];

// Generate 35 questions
for(let i=1; i<=35; i++) {
    const d = domains[(i-1) % domains.length];
    const difficulty = i <= 10 ? "Very Easy" : i <= 25 ? "Easy" : "Medium";
    
    questions.push({
        id: `q-${i}`,
        title: `${d.title} Management`,
        difficulty: difficulty,
        instructions: "Follow the comments in index.js and index.html to complete the platform.",
        starterCode: {
            "index.js": `const express = require("express");\n\n// Write import here\n\nconst app = express();\nconst PORT = 3000;\n\napp.use(express.static("."));\n\n// Write API here\n\n\napp.listen(PORT, () => {\n    console.log(\`Server running at http://localhost:\${PORT}\`);\n});`,
            "index.html": generateHTML(d.title, d.path, d.headers),
            "data.json": JSON.stringify(d.data, null, 2)
        },
        expectedAPIs: [{ method: "GET", path: d.path }],
        hints: ["Import JSON using require()", `Route path should be ${d.path}`, "Use fetch() with async/await"],
        solution: `const data = require("./data.json");\napp.get("${d.path}", (req, res) => res.send(data));`,
        explanation: "Simple direct import and GET route implementation."
    });
}

fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));
console.log("35 Questions Updated with Placeholders!");
