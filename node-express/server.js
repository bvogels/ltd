// Create express app
let express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
let app = express();

// Server port
let HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/content/Homepage.html'))
});

app.use(express.static(path.join(__dirname+ '/content/')));

// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

