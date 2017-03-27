const uglify = require('uglify-js'),
  fs = require('fs.extra'),
  path = require('path'),
  glob = require('glob'),
  imagemin = require('imagemin'),
  imageminJpegtran = require('imagemin-jpegtran'),
  imageminPngquant = require('imagemin-pngquant'),
  imgsDir = path.resolve('images'),
  buildDir = path.resolve('dist', 'images')
  sF = `[${path.basename(__filename)}]`;

console.log(`${sF} processing images...`);

imagemin([`${imgsDir}/*.{jpg,png}`], buildDir, {
	plugins: [
		imageminJpegtran(),
		imageminPngquant({quality: '65-80'})
	]
}).then(files => {
  files.forEach((file) => {
    console.log(`${sF} minified ${file.path}`);

  })
});
