// Loads express and storage library
const express = require('express');
const storage = require('node-persist');

// Holds the current views
var counter = 0;

// Create a new Express app instance
var app = express();
app.use(express.static('./static'));

// Registers an event triggered on HTTP GET /visit
app.get("/reset", (req, res) => {
    counter++;
    
    // Saves counter into the store and send response AFTER the store has been saved
    storage.setItem("counter", counter).then(() => {
        res.json(counter);
    });
});

// Inits permanent storage and reads the saved counter
storage.init().then(() => storage.getItem("counter")).then((value) => {
    // Checks if value read is valid, otherwise set it to 0
    if (value > 0) {
        counter = value;
    } else {
        counter = 0;
    }

    // Start the web server, listening on port 8080, AFTER the counter has been read
    app.listen(3000, "0.0.0.0");
});