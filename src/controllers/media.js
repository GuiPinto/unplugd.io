var Media = require('../models').Media;
var async = require('async');




module.exports.processSongUpdate = function (updateData, callback) {

	if (!updateData || updateData.length == 0) {
		return callback();
	}

	async.eachSeries(updateData, processMediaUpdate, function(err) {
		callback();
	});

}



function processMediaUpdate(mediaData, callback) {
	var uniqueId = Media().generateId(mediaData);

	Media.findOne({ id: uniqueId }, function(err, mediaQuery) {

		if (mediaQuery) {

			var media = mediaData.media || null,
				user = mediaData.user || null,
				score = mediaData.score || null;

			mediaQuery.score = {
					grabs: score.grabs || 0,
					listeners: score.listeners || 0,
					negative: score.negative || 0,
					positive: score.positive || 0
			};

			mediaQuery.save(function(savedMediaObj) {
				callback();
			});

		} else {

			var media = mediaData.media || null,
				user = mediaData.user || null,
				score = mediaData.score || null;

			var mediaObj = new Media({
				id: uniqueId,
				title: media.title || null,
				author: media.author || null,
				cid: media.cid || null,
				duration: media.duration || 0,
				format: media.format || 0,
				image: media.format || null,
				score: {
					grabs: score.grabs || 0,
					listeners: score.listeners || 0,
					negative: score.negative || 0,
					positive: score.positive || 0
				},
				user: {
					id: user.id || null,
					username: user.username || null
				}
			});

			mediaObj.save(function(savedMediaObj) {
				callback();
			});

		}

	});

};



module.exports.generateInitialData = function (callback) {

	Media.find({}, { _id: 0, id: 0, __v: 0 })
		.sort({ _id: -1 })
		.limit(21)
		.exec(function(err, mediaResults) {

		if (mediaResults.length > 0) {

			var nowPlaying = mediaResults.shift();

			return callback({
				nowPlaying: nowPlaying,
				history: mediaResults
			});

		} else {

			return callback({
				error: err,
				mediaResults: mediaResults
			});

		}

	});

}
