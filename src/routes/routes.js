var env = process.env.NODE_ENV || 'development';
var controllers = require('../controllers');
var ripper = controllers.ripper;
var sockets = controllers.sockets;

module.exports = function(app){

	app.get('/', function(req, res) {
		res.render('player');
		console.log('HEY!!');
	});

};
