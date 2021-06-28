const {Router} = require('express');
const Routes = Router();

const controller = require ('../controllers/Controller');

Routes.get('/', controller.displayHomepage);
Routes.post("/search", controller.storeInfoData);
//Routes.post('/login', controller.login);
//Routes.delete('/logout', controller.logout);
Routes.post("/createaccount", controller.createaccount);
Routes.post("/getRecentSearched", controller.getRecentSearched);
Routes.post("/getcovidinfo", controller.getcovidinfo);
module.exports = Routes;
