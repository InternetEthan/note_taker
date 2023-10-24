// Import required modules
const express = require('express'); // Import the Express framework
const app = express(); // Create an instance of the Express application
const path = require('path'); // Import the path module for working with file and directory paths
const fs = require('fs'); // Import the fs module for working with the file system
const notes = require('./db/db.json'); // Import the db.json file


app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        res.json(notes);
    });
});


app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notes.length;
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
})

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve notes.html at the /notes URL
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Start the server
const PORT = process.env.PORT || 3001; // Set the port number for the server
app.listen(PORT, () => { // Start the server and listen for incoming requests
    console.log(`Server listening on port ${PORT}`); // Log a message to the console when the server starts
});