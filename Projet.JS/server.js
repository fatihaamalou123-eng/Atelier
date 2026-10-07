const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.static(__dirname));

const PORT = 3000;


const readJSON = (file) => JSON.parse(fs.readFileSync(file, 'utf8') || "[]");
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// ================= API STAGIAIRES =================

// 1. Get All
app.get('/api/stagiaires', (req, res) => {
    res.json(readJSON('stagiaires.json'));
});

// 2. Add (Post)
app.post('/api/stagiaires', (req, res) => {
    const data = readJSON('stagiaires.json');
    data.push(req.body);
    writeJSON('stagiaires.json', data);
    res.json({ message: "Ajouté!" });
});

// 3. Delete
app.delete('/api/stagiaires/:id', (req, res) => {
    let data = readJSON('stagiaires.json');
    
    data = data.filter(s => s.id != req.params.id);
    writeJSON('stagiaires.json', data);
    res.json({ message: "Supprimé!" });
});

// 4. Update (Put)
app.put('/api/stagiaires/:id', (req, res) => {
    let data = readJSON('stagiaires.json');
    const index = data.findIndex(s => s.id == req.params.id);
    if (index !== -1) {
        data[index] = req.body; 
        writeJSON('stagiaires.json', data);
        res.json({ message: "Modifié!" });
    }
});

// ================= API FORMATEURS =================

// 1. Get All
app.get('/api/formateurs', (req, res) => {
    res.json(readJSON('formateurs.json'));
});

// 2. Add (Post)
app.post('/api/formateurs', (req, res) => {
    const data = readJSON('formateurs.json');
    data.push(req.body);
    writeJSON('formateurs.json', data);
    res.json({ message: "Ajouté!" });
});

// 3. Delete
app.delete('/api/formateurs/:id', (req, res) => {
    let data = readJSON('formateurs.json');
    data = data.filter(f => f.id != req.params.id);
    writeJSON('formateurs.json', data);
    res.json({ message: "Supprimé!" });
});

// 4. Update (Put)
app.put('/api/formateurs/:id', (req, res) => {
    let data = readJSON('formateurs.json');
    const index = data.findIndex(f => f.id == req.params.id);
    if (index !== -1) {
        data[index] = req.body;
        writeJSON('formateurs.json', data);
        res.json({ message: "Modifié!" });
    }
});


app.listen(PORT, () => {
    console.log(`server travaile: http://localhost:${PORT}`);
});