var env = process.env.NODE_ENV || 'development';
var controllers = require('../controllers');
var ripper = controllers.ripper;
var main = controllers.main;
var player = controllers.player;

module.exports = function(app, io){

	app.get('/songChange', function(req, res) {
		return main.songChange(req, res, io);
	});

	app.get('/', player.index);
	app.get('/desktop', player.desktopPlayer);
	app.get('/coreysVersion', player.coverPage);

};
