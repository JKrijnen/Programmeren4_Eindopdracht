/*
    PLACEHOLDER_routes.js   -   Routing the requests
 */
//Require for the express module
const express = require('express');
const AuthController = require('../controllers/AuthController');

//Creating the express Router
let routes = express.Router();

//The request
routes.post('/login', auth_controller.login);
routes.post('/register', auth_controller.register);

module.exports = routes;