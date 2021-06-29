const Model = require("../models/Models");
const path = require("path");
const fetch = require("node-fetch");
const CityState = new Map();
CityState.set("Helsinki", "Finland");
CityState.set("Sevilla", "Spain");
CityState.set("Vienna", "Austria");

class Controller {


    static displayHomepage(req, res){

        res.sendFile(path.join(__dirname+'../../../content/Homepage.html'));
       //Model.getAPI();
       // Model.displayAvailableFlight("Sevilla");

    }
    static getcovidinfo(req,res){
    /*
        Model.getCovidInfo(req.body.destination)
            .then(row =>{
                console.log(row);
                res.send(row);
            })
*/
        let country = CityState.get(req.body.destination);
        const url = 'https://covid-api.mmediagroup.fr/v1/cases?country=' + country;
        fetch(url, {method: 'GET'})
            .then((resp) => resp.json())
            .then(function (data) {
                res.send(data.All);
                //Model.insertCovidInfo(data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static storeInfoData(req, res){
          let item = req.body;
        Model.displayAvailableFlight(item.destination)
            .then(flights =>{
                res.send(JSON.stringify(flights));
        })

    }

    static createaccount(req, res){
        Model.checkifAccountexists(req.body)
        .then(row =>{
            if (row === undefined) {

                Model.createAccount(req.body);

                res.send(JSON.stringify({"Response" : "Account created"}));
            }
            else{
                res.send(JSON.stringify({"Response" : "Account existed"}));
            }

        })
    }

    static getRecentSearched(req,res){
        Model.getLastSearch(req.body.mail)
            .then(row =>{
                if(row === undefined){
                    res.send(JSON.stringify({"mail" : "undefined"}));
                }
                else{
                    res.send(row);
                }

            })
    }

    static logout(req,res){
        req.session.destroy();
        res.redirect('/');
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

*/


}

module.exports = Controller;