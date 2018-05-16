/*
    PLACEHOLDER_routes.js   -   Routing the requests
 */
//Require for the express module
const express = require('express');
const AuthController = require('../controllers/AuthController');

//Creating the express Router
let routes = express.Router();

//The request
routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);

module.exports = routes;