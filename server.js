// Create express app
let express = require("express");
let app = express();
const session = require('express-session');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const Model = require("./api/models/Models");

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

app.use(session({secret: 'mySecret',saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname+ '/content/')));
// Root endpoint
/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/content/Homepage.html'))
});

app.use(express.static(path.join(__dirname+ '/content/')));
*/
// Insert here other API endpoints



app.post('/login',function(req, res){
    let mail = req.body.mail;
    let password = req.body.password;
    req.session.name = mail;
    Model.getUsersFromDatabase(req.body.mail)
        .then(row =>{
            if (row === undefined) {
                res.send(JSON.stringify({"Response" : "usernotfound"}));
                req.session.destroy();

            }
            else if(mail === row.mail && password === row.password){
                Model.getLastSearch();
                res.send(JSON.stringify({"Response": "passwordcorrect"}));
            }
            else{
                res.send(JSON.stringify({"Response": "passwordincorrect"}));
                req.session.destroy();
            }
        })

})

app.delete('/logout', function (req,res){
    req.session.destroy();
    res.redirect('/');
})









