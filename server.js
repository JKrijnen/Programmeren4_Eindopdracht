const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config/config');
const db = require('./config/db.improved');
const error = require('./model/ApiError');
const auth_controller = require('./controllers/auth_controller');
const auth_routes = require('./routes/auth_routes');
const studentenhuis_controller = require('./controllers/studentenhuis_controller');
const studentenhuis_routes = require('./routes/studentenhuis_routes');
const maaltijd_routes = require('./routes/maaltijd_routes');



const port = process.env.PORT || config.webPort || 4001

var app = express();

app.use(bodyParser.urlencoded({
	'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

app.use(logger('dev'));

// Voeg ContentType toe aan alle responses (en ga door naar next route handler)
app.use('*', function (req, res, next) {
	res.contentType('application/json');
	console.log('contenttype toegevoegd.');
	console.log('URL = ' + req.baseUrl);
	next();
});

// Demo route handler - print logregel voor alle /api* endpoints.
app.use('/api*', function (req, resp, next) {
	console.log('/api aangeroepen');
	next();
});

app.use('/api', auth_routes);
app.all('*', auth_controller.validateToken);


// Installeer de api endpoint routes die we willen aanbieden 
app.use('/api/studentenhuis', studentenhuis_routes);
app.use('/api/studentenhuis', maaltijd_routes);

// Error handler, handelt alle foutsituaties af waarbij error !== null
app.use(function (error, req, res, next) {
	console.error(error.toString());
	res.status(error.code).json({
		message: error
	}).end();
});

app.listen(port, function () {
	console.log('De server luistert op port ' + port); //log the actual active port, not some static number
});

module.exports = app;