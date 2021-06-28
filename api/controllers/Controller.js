const Model = require("../models/Models");
const path = require("path");


class Controller {


    static displayHomepage(req, res){

        res.sendFile(path.join(__dirname+'../../../content/Homepage.html'));
       //Model.getAPI();


    }
    static changeToHomepage(req,res){

    }

    static storeInfoData(req, res){
        console.log(req.route.path+" requested");
        let item = req.body;

        console.log(item);
        //res.send(req.body);
        //ask api
        res.sendFile(path.join(__dirname+'../../../content/Desk.html'));

    }
/*
    static login(req,res){
        let mail = req.body.mail;
        let password = req.body.password;
        req.session.name = mail;
        console.log(req.body);
        Model.getUsersFromDatabase(req.body.mail)
            .then(row =>{
                if (row === undefined) {
                    res.send(JSON.stringify({"Response" : "usernotfound"}));
                    req.session.destroy(function(error){
                        console.log("Session Destroyed")
                    })
                }
                else if(mail === row.mail && password === row.password){
                    res.redirect('/');
                }
                else{
                    res.send(JSON.stringify({"Response": "passwordincorrect"}));
                    req.session.destroy();
                }
            })
            .catch(error => {
                res.send(error);
            });

    }
    static logout(req,res){
        req.session.destroy();
        res.redirect('/');
    }
*/


}

module.exports = Controller;