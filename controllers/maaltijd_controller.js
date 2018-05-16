var db = require('../config/db.improved');
const ApiError = require("../model/ApiError");
const sql = require('mysql');
const auth = require("../Auth/Authentication");

module.exports = {

 getMaaltijdList(req, res, next){
    query = {
        sql: 'SELECT * FROM maaltijd WHERE StudentenhuisID = ?',
        values: [req.params.id]
    };
    db.query(query, function (error, rows, fields) {
        if (error) {
            res.status(400);
            res.json(error);
            console.log("hier")
        } else {
            console.log(rows);
            res.status(200).json({
                status: {
                    query: 'OK'
                },
                    result: rows
                }).end();
        };
    });
        
    },

   /* getMaaltijdByID(req, res, next){
        let token = req.header("x-access-token") || '';
        auth.decodeToken(token, (err, payload) => {
            if (err) {
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else {
                console.log("authenticated! Payload = ")
                console.dir(payload)
                next();
            }
        });
    },
*/
    createMaaltijd(req, res, next){
        let token = req.header("x-access-token") || '';
        auth.decodeToken(token, (err, payload) => {
            if (err) {
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else {
                console.log("authenticated! Payload = ")
                console.dir(payload)
                    
                query = {
                    sql: 'INSERT INTO maaltijd (Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    values: [req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, payload.jti, req.params.id],
                    timeout: 2000
                };
                db.query(query, function (error, rows, fields) {
                    if (error) {
                        res.status(400);
                        res.json(error);
                        console.log("hier")
                    } else {
                        console.log(rows);
                        res.status(200).json({
                            status: {
                                query: 'OK'
                            },
                                "ID": rows.insertId,
                                "naam": req.body.naam,
                                "beschrijving": req.body.beschrijving,
                                "ingredienten": req.body.ingredienten,
                                "allergie": req.body.allergie,
                                "prijs": req.body.prijs
                            }).end();
                    };
                });    
                
            }
        });
    },
/*
    putMaaltijdByID(req, res, next){

    },

    deleteMaaltijd(req, res, next){

    }
    */
}