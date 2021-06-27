const Model = require("../models/Models");
const path = require("path");


class Controller {


    static displayHomepage(req, res){
        res.sendFile(path.join(__dirname+'../../../content/Homepage.html'));
        Model.getAPI();

    }

    static storeInfoData(req, res){
        console.log(req.route.path+" requested");
        let item = req.body;

        console.log(item);
        //res.send(req.body);
        //ask api
        res.sendFile(path.join(__dirname+'../../../content/Desk.html'));

    }


}

module.exports = Controller;