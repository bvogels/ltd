const path = require('path')
const fetch = require("node-fetch");
const path = require("express-session");
const sqlite3 = require('sqlite3').verbose();
const CityState = new Map();

CityState.set("Helsinki", "Finland");
CityState.set("Sevilla", "Spain");

class Model {
    static getCovidInfo(city){
        let country = CityState.get(city);
        this.getAPI(country);
        let db = new sqlite3.Database('./api/models/ltd.db');
        let sql = `SELECT * FROM covidinfo WHERE country = ?`;
        return new Promise((resolve,reject)=>{

            db.get(sql, country, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });

            db.close();
        })

}
    static getAPI(country){
        const url = 'https://covid-api.mmediagroup.fr/v1/cases?country=' + country;
        console.log(url);
        fetch(url, {method: 'GET'})
            .then((resp) => resp.json())
            .then(function (data) {
                Model.insertCovidInfo(data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    static insertCovidInfo(data){

        let country = data["All"]['country'];
        let confirmed = data['All']['confirmed'];
        let recovered  = data['All']['recovered'];
        let deaths = data['All']['deaths'];
        let dataset = [country, confirmed, recovered, deaths];

        let db = new sqlite3.Database('./api/models/ltd.db');
        db.run("CREATE TABLE IF NOT EXISTS covidinfo (country text PRIMARY KEY, confirmed long, recovered long, deaths long); ");
        let sql = "INSERT INTO covidinfo VALUES (?, ?, ?, ?)";

        db.run(sql, dataset, function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
        });
        // close the database connection
        db.close();


    }

    static getUsersFromDatabase(mail, callback){
        let db = new sqlite3.Database('./api/models/ltd.db');
        let sql = 'SELECT * FROM users WHERE mail = ?';
        return new Promise((resolve,reject)=>{
            db.get(sql, mail, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
            db.close();
        })
    }

   static displayAvailableFlight(destination) {
        //debugger;
        let flight;
        let dbPath = path.resolve(__dirname+ 'flights.db');
        let flightsDB = new sqlite3.Database(dbPath);
        let query = 'SELECT * FROM flight';
        return new Promise((resolve, reject) => {
            flightsDB.each(query, [destination], (err, row) => {
                if (err) {
                    throw err;
                }
                flight = '${row.airline}';
            });
            flightsDB.close();
            return flight;
        })
    }
    static checkifAccountexists(body){
        let mail = body.mail;
        let db = new sqlite3.Database('./api/models/ltd.db');
        let sql = `SELECT * FROM users WHERE mail = ?`;
        return new Promise((resolve,reject)=>{

            db.each(sql, mail, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {

                    resolve(row);
                }
            });

            db.close();
        })


    }

    static createAccount(body){
        let db = new sqlite3.Database('./api/models/ltd.db');
        let dataset = [body.mail, body.password];
        let sql =  "INSERT INTO users VALUES (?, ?)";
        return new Promise((resolve,reject)=>{

            db.get(sql, dataset, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });

            db.close();
        })
    }

    static getLastSearch(mail){
        let db = new sqlite3.Database('./api/models/ltd.db');
        let sql = `SELECT * FROM lastsearched WHERE mail = ?`;
        return new Promise((resolve,reject)=>{

            db.get(sql, mail, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });

            db.close();
        })


    }

    static displayAvailableFlight(destination) {
        let db = new sqlite3.Database('./api/models/flights.db');
        let sql = 'SELECT * FROM flight WHERE destination = ?';
        return new Promise((resolve, reject) => {

            db.each(sql, destination, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });

            db.close();
        })

    }


}

module.exports = Model;