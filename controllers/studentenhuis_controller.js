var db = require('../config/db.improved');
const ApiError = require("../model/ApiError");
module.exports = {

    getAll(req, res, next) {
        console.log(req.body)
        db.query('SELECT * FROM user', function (error, rows, fields) {
            if (error) {
                next(new ApiError);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });
    },

    getByID(req, res, next) {
        console.log('todo.controller getAll');
        db.query('SELECT * FROM user', function (error, rows, fields) {
            if (error) {
                next(error);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });
    },


}