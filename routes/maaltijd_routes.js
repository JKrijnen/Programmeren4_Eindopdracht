/*
    PLACEHOLDER_routes.js   -   Routing the requests
 */
//Require for the express module
const express = require('express');
const maaltijd_controller = require('../controllers/maaltijd_controller');

//Creating the express Router
let routes = express.Router();

//The GET personList request
routes.get('/:id/maaltijd', maaltijd_controller.getMaaltijdList);

routes.get('/:id/maaltijd/:maaltijdID', maaltijd_controller.getMaaltijdByID);

routes.post('/:id/maaltijd', maaltijd_controller.createMaaltijd);

routes.put('/:id/maaltijd/:maaltijdID', maaltijd_controller.putMaaltijdByID);

routes.delete('/:id/maaltijd/:maaltijdID', maaltijd_controller.deleteMaaltijd);

module.exports = routes;