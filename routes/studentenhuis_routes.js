//
// studentenhuis.api.js
//
var express = require('express');
var routes = express.Router();
var studentenhuis_controller = require('../controllers/studentenhuis_controller');

// 
// andere benadering dan je tot nu toe zag - routes zijn gescheiden van de controllers;
// de controllers verzorgen de afhandeling. 
//
 routes.get('/', studentenhuis_controller.getAll);

 routes.get('/:id', studentenhuis_controller.getByID);

 routes.put('/:id', studentenhuis_controller.put);

 routes.post('/', studentenhuis_controller.create);

// routes.delete('/:id', studentenhuis_controller.delete);


module.exports = routes;