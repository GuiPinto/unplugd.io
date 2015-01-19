var path = require('path');

// Lets iterate through all components in the local directory
// and expose them through module.exports

require('fs').readdirSync(__dirname).forEach(function (file) {
	// If its the current file, ignore it
	if (file === 'index.js') return;

	//Store module with its name (from filename)
	module.exports[path.basename(file, '.js')] = require(path.join(__dirname, file));

});
