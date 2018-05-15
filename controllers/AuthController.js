const auth = require("../Auth/Authentication")
const ApiError = require("../model/ApiError")
const loginList = []

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
        if (loginList[req.body.username] === req.body.password) {
            res.status(200).json(auth.encodeToken(req.body.username)).end();
        } else {
            next();
        }
    },
    register(req, res, next) {
        if (loginList[req.body.username] === undefined) {
            loginList[req.body.username] = req.body.password
            let token = auth.encodeToken(req.body.username);
            res.status(200).json({ "token": token }).end();
            res.status(200).json({}).end();
        } else {
            next(new ApiError("Username is already taken", 401));
        }
    }
}