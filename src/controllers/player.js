var url      = require('url');
var ua      = require('mobile-agent');


module.exports.index = function (req, res) {

	var params = url.parse(req.url, true).query;

	var agent = ua(req.headers['user-agent']);

	var isMobile = agent.Mobile || false;

	if (!isMobile && (!params.embed && !params.mobile)) {
		return res.redirect("/desktop");
	}

	res.render('player');
}


module.exports.desktopPlayer = function (req, res) {
	res.render('desktopPlayer');
}




