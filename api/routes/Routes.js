const {Router} = require('express');
const Routes = Router();

const controller = require ('../controllers/Controller');

Routes.get('/', controller.displayHomepage);

module.exports = Routes;
