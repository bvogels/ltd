const Model = require("../models/Models");
const path = require("path");

class Controller {
    static displayHomepage(req, res){
        res.sendFile(path.join(__dirname+'../../../content/Homepage.html'));
    }


}

module.exports = Controller;