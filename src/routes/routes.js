var env = process.env.NODE_ENV || 'development';
var controllers = require('../controllers');
var ripper = controllers.ripper;
var main = controllers.main;

module.exports = function(app, io){

	app.get('/song', function(req, res) {
		return main.newSong(req, res, io);
	});

	app.get('/', main.player);

};
