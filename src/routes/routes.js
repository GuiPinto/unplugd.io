var env = process.env.NODE_ENV || 'development';
var controllers = require('../controllers');
var ripper = controllers.ripper;
var main = controllers.main;

module.exports = function(app, io){

	app.get('/songChange', function(req, res) {
		return main.songChange(req, res, io);
	});

	app.get('/', main.player);

};
