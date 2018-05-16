const auth = require("../Auth/Authentication");
const ApiError = require("../model/ApiError");
const db = require('../config/db.improved');
const sha = require('sha.js');
let query;
let hashedPass;


module.exports = {
    validateToken(req, res, next) {
        console.log("validating token")
        let token = req.header("x-access-token") || '';
        auth.decodeToken(token, (err, payload) => {
            if (err) {
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else {
                console.log("authenticated! Payload = ")
                console.dir(payload)
                req.user = payload.sub
                next();
            }
        });
    },

    login(req, res, next) {
        hashedPass = sha('sha256').update(req.body.password).digest('hex')
            query = {
                sql: 'SELECT * FROM user WHERE Email = ? AND Password = ?',
                values: [req.body.email, hashedPass],
                timeout: 2000
            }
            db.query(query, function (error, rows, fields) {
            if(rows.length !== 0){
<<<<<<< HEAD
                res.status(200).json(auth.encodeToken(req.body.email, rows.insertId)).end();
            }else {next(new ApiError("Geen goede login"), 401)}
=======
                res.status(200).json(auth.encodeToken(req.body.email)).end();
            }else {next(new ApiError("Geen goede login", 401))}
>>>>>>> development
        })
    },

    register(req, res, next) {

        console.log(req.body.email, req.body.firstname, req.body.lastname, req.body.password);
        if (req.body.email != undefined && req.body.password != undefined) {
            query = {
                sql: 'SELECT * FROM user WHERE Email = ?',
                values: [req.body.email],
                timeout: 2000
            };
            db.query(query, function(error, rows, fields){
                console.log(rows)
                if (rows.length === 0) {
                    var user = req.body;
                    hashedPass = sha('sha256').update(req.body.password).digest('hex');
                    query = {
                        sql: 'INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES (?, ?, ?, ?)',
                        values: [user.firstname, user.lastname, user.email, hashedPass],
                        timeout: 2000
                    };
                    db.query(query, function (error, rows, fields) {
                        if (error) {
                            res.status(400);
                            res.json(error);
                        } else {
                            console.log(rows);
                            let token = auth.encodeToken(req.body.email, rows.insertId);
                            res.status(200).json({ "token": token }).end();
                        };
                    });

                } else {
                    next(new ApiError('Email is al in gebruik.', 409))
                };
            });
            }
        
    }
}
