var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('MD5');


var MediaModel;
var MediaSchema = new Schema({
	id: { type: String, required: true, unique: true },
	played: { type: Date, default: Date.now },
	title: { type: String, default: null },
	author: { type: String, default: null },
	cid: { type: String, default: null },
	duration: { type: Number, default: null },
	format: { type: Number, default: null },
	image: { type: String, default: null },
	score: {
		grabs: { type: Number, default: null },
		listeners: { type: Number, default: null },
		negative: { type: Number, default: null },
		positive: { type: Number, default: null }
	},
	user: {
		id: { type: Number, default: null },
		username: { type: String, default: null }
	}
});


MediaSchema.methods.generateId = function(data) {
	var media = data.media || null,
		user = data.user || null;

	var hash = {
		title: media.title || null,
		author: media.author || null,
		cid: media.cid || null,
		userid: user.id || null,
		yearMonthDay: new Date().toISOString().slice(0,10)
	}
	return md5(JSON.stringify(hash));
};

MediaModel = mongoose.model('Media', MediaSchema);
module.exports.schema = MediaSchema;
module.exports.model = MediaModel;
