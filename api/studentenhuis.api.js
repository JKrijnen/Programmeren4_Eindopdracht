//
// studentenhuis.api.js
//
var express = require('express');
var routes = express.Router();
var studentenhuisController = require('../controllers/studentenhuis.controller');

module.exports = {}

// 
// andere benadering dan je tot nu toe zag - routes zijn gescheiden van de controllers;
// de controllers verzorgen de afhandeling. 
//
routes.get('/', studentenhuisController.get);

module.exports = routes;