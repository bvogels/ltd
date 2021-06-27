// Create express app
let express = require("express");
let app = express();
const session = require('express-session');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');

let sess;
// Server port
let HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
const Routes = require ("./api/routes/Routes");
app.use('/', Routes);


app.use(express.static(path.join(__dirname+ '/content/')));
// Root endpoint
/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/content/Homepage.html'))
});

app.use(express.static(path.join(__dirname+ '/content/')));
*/
// Insert here other API endpoints

// Default response for any other requestS
app.use(function(req, res){
    res.status(404);
});


// app.use(session({secret: 'mySecret',saveUninitialized: true, resave: true}));





