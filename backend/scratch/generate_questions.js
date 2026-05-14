const fs = require('fs');

const questions = [];

// LEVEL 1: VERY EASY (10 Questions)
const l1Domains = [
    { title: "Student List", path: "/students", key: "name", file: "students.json" },
    { title: "Teacher Directory", path: "/teachers", key: "subject", file: "teachers.json" },
    { title: "Library Books", path: "/books", key: "title", file: "books.json" },
    { title: "Product Catalog", path: "/items", key: "price", file: "items.json" },
    { title: "Hospital Patients", path: "/patients", key: "disease", file: "patients.json" },
    { title: "Employee Database", path: "/staff", key: "role", file: "staff.json" },
    { title: "Fruit Inventory", path: "/fruits", key: "color", file: "fruits.json" },
    { title: "Car Models", path: "/cars", key: "brand", file: "cars.json" },
    { title: "Mobile Phones", path: "/phones", key: "model", file: "phones.json" },
    { title: "Movie Collection", path: "/films", key: "genre", file: "films.json" }
];

l1Domains.forEach((d, i) => {
    questions.push({
        id: `l1-${i+1}`,
        title: d.title,
        difficulty: "Very Easy",
        instructions: `Backend me missing GET route '${d.path}' ko complete karein taaki data show ho jaye.`,
        starterCode: {
            "index.js": `const express = require('express');\nconst app = express();\nconst fs = require('fs');\n\n// TODO: Complete GET '${d.path}'\n\napp.listen(3000);`,
            "index.html": `<h1>${d.title}</h1><ul id='out'></ul>\n<script>\nfetch('${d.path}').then(r=>r.json()).then(data=>{\n  data.forEach(x => {\n    document.getElementById('out').innerHTML += '<li>' + x.${d.key} + '</li>';\n  });\n});\n</script>`,
            "data.json": `[{"${d.key}": "Sample 1"}, {"${d.key}": "Sample 2"}]`
        },
        expectedAPIs: [{ method: "GET", path: d.path }],
        hints: [`Check the URL '${d.path}' in index.html.`, "Use fs.readFileSync to read the file.", "Send the data using res.json()."],
        solution: `app.get('${d.path}', (req, res) => {\n  const data = JSON.parse(fs.readFileSync('data.json'));\n  res.json(data);\n});`,
        explanation: `HTML me fetch('${d.path}') diya tha, isliye backend me app.get('${d.path}') banana tha. Simple file read logic use karna tha.`,
        mcqs: [{ question: "Which method is used to read files in Node.js?", options: ["fs.readFile", "fs.write", "res.send", "app.get"], answer: 0 }]
    });
});

// LEVEL 2: EASY (15 Questions)
const l2Domains = [
    { title: "Task Manager", path: "/tasks", methods: ["GET", "POST"] },
    { title: "User Profile", path: "/users", methods: ["GET", "DELETE"] },
    { title: "Cart Items", path: "/cart", methods: ["GET", "POST"] },
    { title: "Game Scores", path: "/scores", methods: ["GET", "POST"] },
    { title: "Music Playlists", path: "/songs", methods: ["GET", "DELETE"] },
    { title: "Recipe Book", path: "/recipes", methods: ["GET", "POST"] },
    { title: "City Weather", path: "/cities", methods: ["GET", "PUT"] },
    { title: "Vehicle Reg", path: "/vehicles", methods: ["GET", "DELETE"] },
    { title: "Customer Feed", path: "/feedback", methods: ["GET", "POST"] },
    { title: "Job Portal", path: "/jobs", methods: ["GET", "DELETE"] },
    { title: "Hotel Rooms", path: "/rooms", methods: ["GET", "PUT"] },
    { title: "Stock Market", path: "/stocks", methods: ["GET", "POST"] },
    { title: "Student Grades", path: "/grades", methods: ["GET", "DELETE"] },
    { title: "Pet Shelter", path: "/pets", methods: ["GET", "POST"] },
    { title: "Gym Members", path: "/members", methods: ["GET", "DELETE"] }
];

l2Domains.forEach((d, i) => {
    const isPost = d.methods.includes("POST");
    const isDel = d.methods.includes("DELETE");
    const isPut = d.methods.includes("PUT");
    
    questions.push({
        id: `l2-${i+1}`,
        title: d.title,
        difficulty: "Easy",
        instructions: `Is platform par '${d.methods[0]}' aur '${d.methods[1]}' routes ko complete karein.`,
        starterCode: {
            "index.js": `const express = require('express');\nconst app = express();\nconst fs = require('fs');\napp.use(express.json());\n\n// TODO: Complete missing routes\n\napp.listen(3000);`,
            "index.html": `<h1>${d.title}</h1>\n<button onclick='fetchData()'>View</button>\n${isPost ? "<button onclick='addData()'>Add</button>" : ""}\n${isDel ? "<button onclick='delData(1)'>Delete ID 1</button>" : ""}\n<script>\nfunction fetchData() { fetch('${d.path}').then(r=>r.json()).then(d=>console.log(d)); }\n</script>`,
            "data.json": `[]`
        },
        expectedAPIs: d.methods.map(m => ({ method: m, path: m === "DELETE" || m === "PUT" ? `${d.path}/1` : d.path })),
        hints: ["Don't forget app.use(express.json()) for POST/PUT.", "Use req.params.id for DELETE.", "Use req.body for POST."],
        solution: `app.get('${d.path}', (req, res) => res.json(JSON.parse(fs.readFileSync('data.json'))));\n${isPost ? `app.post('${d.path}', (req, res) => { const d = JSON.parse(fs.readFileSync('data.json')); d.push(req.body); fs.writeFileSync('data.json', JSON.stringify(d)); res.json({ok:true}); });` : ""}\n${isDel ? `app.delete('${d.path}/:id', (req, res) => { let d = JSON.parse(fs.readFileSync('data.json')); d = d.filter(x => x.id != req.params.id); fs.writeFileSync('data.json', JSON.stringify(d)); res.json({ok:true}); });` : ""}`,
        explanation: `Isme humne basic GET ke saath ${isPost ? "POST" : isDel ? "DELETE" : "PUT"} implement kiya hai. Simple array methods push/filter use kiye gaye hain.`
    });
});

// LEVEL 3: MEDIUM (10 Questions)
for(let i=1; i<=10; i++) {
    questions.push({
        id: `l3-${i}`,
        title: `University CRUD ${i}: Resource Management`,
        difficulty: "Medium",
        instructions: "Full CRUD (GET, POST, DELETE) implement karein specific resource ke liye.",
        starterCode: {
            "index.js": "const express = require('express');\nconst app = express();\nconst fs = require('fs');\napp.use(express.json());\n\n// TODO: Full CRUD routes here\n\napp.listen(3000);",
            "index.html": "<h1>CRUD System</h1><script>fetch('/resource').then(r=>r.json());</script>",
            "data.json": "[]"
        },
        expectedAPIs: [
            { method: "GET", path: "/resource" },
            { method: "POST", path: "/resource" },
            { method: "DELETE", path: "/resource/1" }
        ],
        hints: ["Combine all previous knowledge.", "Ensure file is updated after each write operation.", "Use app.get, app.post, and app.delete."],
        solution: "app.get('/resource', (req, res) => res.json(JSON.parse(fs.readFileSync('data.json'))));\napp.post('/resource', (req, res) => { /* logic */ });\napp.delete('/resource/:id', (req, res) => { /* logic */ });",
        explanation: "Simple CRUD workflow: Fetching data, adding new records, and removing by ID."
    });
}

fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));
console.log("35 Questions Generated!");
