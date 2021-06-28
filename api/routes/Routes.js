const {Router} = require('express');
const Routes = Router();

const controller = require ('../controllers/Controller');

Routes.get('/', controller.displayHomepage);
Routes.post("/search", controller.storeInfoData);
//Routes.post('/login', controller.login);
Routes.get('/Homepage', controller.changeToHomepage);
//Routes.get('logout', controller.logout);
module.exports = Routes;
