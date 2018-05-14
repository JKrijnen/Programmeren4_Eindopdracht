var db = require('../config/db.improved');

module.exports = {

    get(req, res, next) {
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

    get(req, res, next) {
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