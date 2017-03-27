const uglify = require('uglify-js'),
	fs = require('fs.extra'),
	path = require('path'),
	glob = require('glob'),
	jsDir = path.resolve('javascripts'),
	outputDir = path.resolve('dist/js/dist.js'),
	sF = `[${path.basename(__filename)}]`;

console.log(`${sF} processing javascripts...`);


//one-liner returns an array of file names in dir
let files = glob.sync(path.resolve(jsDir, '*'));

let blank = '';

files.forEach((file) => {
	blank = blank + uglify.minify(file)
		.code
})


console.log(`${sF} minified: ${files.length} files.
      ${sF} ${files}`);

fs.outputFile(outputDir, blank, err => {
	if (err) {
		throw err;
	} else {
		console.log(`${sF} output built js to ${outputDir}`);
	}
})
