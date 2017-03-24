console.log('building css...');

var fs = require('fs.extra'),
  sass = require('node-sass'),
  path = require('path');
// compile sass into dist/css
var sassEntry = path.join(__dirname, '../scss/_bootswatch.scss'),
  sassPaths = [path.join(__dirname, '../scss/')],
  serial = 'main.css',
  sassOutFilePath = path.join(__dirname, '../dist/css/');

fs.mkdirp(path.join(__dirname, '../dist/css'), function(err) {
  if (err) {
    throw err;
  }
});


sass.render({
  file: sassEntry,
  includePaths: sassPaths,
  outputStyle: 'extended',
  outFile: sassOutFilePath
}, function(error, result) {
  if (!error) {
    fs.writeFile(sassOutFilePath + serial, result.css, function(err) {
      if (!err) {
        console.log('scss successfully compiled to disk at ' + sassOutFilePath);
      } else {
        console.log(err);
        console.log(__dirname);
      }
    })
  } else {
    console.log(error);
  }

});
