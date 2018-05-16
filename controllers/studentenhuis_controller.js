var db = require('../config/db.improved');
const ApiError = require("../model/ApiError");
module.exports = {

    getAll(req, res, next) {
            db.query('SELECT * FROM studentenhuis', function(error, rows, fields){
                if(error){
                    next(new ApiError("Het is niet gelukt alle studentenhuizen op te vragen."), 500)
                }else{
                    console.log(rows);
                    res.status(200).json(rows).end();
                }
            })
    },

    getByID(req, res, next) {
        let studentenhuisID = req.params.id;
        if (studentenhuisID !== undefined) {
            db.query('SELECT * FROM studentenhuis WHERE ID = ?', [studentenhuisID], function (error, rows, fields) {
                if (error) {
                    next(new ApiError("Het is niet gelukt het studentenhuis met ID " + studentenhuisID + " op te vragen."), 500)
                } else {
                    if (rows.length !== 0) {
                        console.log(rows);
                        res.status(200).json(rows).end();
                    } else {
                        console.log("Er bestaat geen studentenhuis met ID: " + studentenhuisID);
                        res.status(400).json("Er bestaat geen studentenhuis met ID: " + studentenhuisID).end();
                    }
                }
            })
        }
    },

    put(req, res, next) {
        let studentenhuisID = req.params.id;
        db.query('UPDATE studentenhuis SET Adres=?,Naam=? WHERE ID = ?', [req.body.Adres, req.body.Naam, studentenhuisID], function (error, rows, fields) {
            if (error) {
                next(new ApiError("Het is niet gelukt om het studentenhuis met ID "+ studentenhuisID+" te updaten"), 500)
            } else {
                if (rows.length !== 0) {
                    console.log(rows);
                    res.status(200).json(rows).end();
                } else {
                    console.log("Het is niet gelukt om het studentenhuis met ID " + studentenhuisID + " te updaten");
                    res.status(400).json("Het is niet gelukt om het studentenhuis met ID " + studentenhuisID + " te updaten").end();
                }
            }
        })
    },















 }