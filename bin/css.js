const fs = require('fs.extra'),
  sass = require('node-sass'),
  path = require('path'),
  autoprefixer = require('autoprefixer'),
  postcss = require('postcss'),
  sF = `[${path.basename(__filename)}]`,
  debug = false;

console.log(`${sF} building css...`);

// compile sass into dist/css
let sassEntry = path.resolve('scss/_bootswatch.scss'),
  sassPaths = [path.resolve('scss/')],
  serial = 'main.css',
  sassOutFilePath = path.resolve('dist/css/');

fs.mkdirp(path.resolve('dist/css'), function(err) {
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

    //report on sassed files
    console.log(`${sF} node-sass entry: ${result.stats.entry}`);
    console.log(`${sF} included files files from: ${sassPaths}`);

    if (debug) {
      result.stats.includedFiles.forEach((name) => {
        sassPaths.forEach((directory) => {
          console.log(path.relative(directory, name));
        })
      })
    };


    //postcss autoprefixer
    postcss([autoprefixer]).process(result.css).then(function(css) {
      css.warnings().forEach(function(warn) {
        console.warn(warn.toString());
      });
      fs.writeFile(path.resolve(sassOutFilePath, serial), css.css, function(e) {
        if (!e) {
          console.log(`${sF} scss successfully compiled to disk at ${sassOutFilePath}`);
        } else {
          throw e;
        }
      })
    });
  } else {
    throw error;
  }
});
