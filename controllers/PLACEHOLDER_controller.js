/*
    PLACEHOLDER_controller.js   -   Controller for the requests
 */
const sql = require('mysql');
const config = require('../config/config');
const ApiError = require('../domain/ApiError');

module.exports = {
    getPLACEHOLDER(request, response, next){
        console.log('---------------A GET request was made---------------');
        console.log('------------------GET PLACEHOLDER-------------------');
        response.status(200).json({
            status: 200,
            message: placeHolder
        }).end();
    },
};