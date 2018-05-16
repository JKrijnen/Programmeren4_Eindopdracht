/*
    PLACEHOLDER_routes.js   -   Routing the requests
 */
//Require for the express module
const express = require('express');
const maaltijd_controller = require('../controllers/maaltijd_controller');

//Creating the express Router
let routes = express.Router();

//The GET personList request
routes.get('/:id/maaltijd/maaltijdID/deelnemers', deelnemer_controller.getAlleDeelnemers);

routes.post('/:id/maaltijd/:maaltijdID', deelnemer_controller.createDeelnemer);

routes.delete('/:id/maaltijd', deelnemer_controller.deleteDeelnemer);

module.exports = routes;