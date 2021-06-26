const fetch = require("node-fetch");
const sqlite3 = require('sqlite3').verbose();

class Model {

    static getAPI(){
        const url = 'https://covid-api.mmediagroup.fr/v1/cases?country=Germany';
        fetch(url, {method: 'GET'})
            .then((resp) => resp.json())
            .then(function (data) {
                Model.getCovidInfo(data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    static getCovidInfo(data){

        let country = data["All"]['country'];
        let confirmed = data['All']['confirmed'];
        let recovered  = data['All']['recovered'];
        let deaths = data['All']['deaths'];
        let dataset = [country, confirmed, recovered, deaths];

        let db = new sqlite3.Database('./api/models/test.db');
        let placeholders = dataset.map((data) => '(?)').join(',');
        console.log("__________________");
        console.log(placeholders);
        console.log("__________________");
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

        console.log(dataset);

    }
}

module.exports = Model;