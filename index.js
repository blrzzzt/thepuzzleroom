console.log('initializing dev backend...');
var path = require('path'),
  nra = require("npm-run-all")


//parallel process wrapper for nodemons running build scripts
let preprocessors = nra(['css', 'js', 'image'], {
    parallel: true,
    stdout: process.stdout,
    stderr: process.stderr
  })
  .then(() => {
    console.log('finished running preprocessors.')
  })
  .catch((err) => {
    console.log(err);
  })

//parallel process wrapper for nodemons running server-time scripts
let server = nra(['serve'], {
  parallel: true,
  stdout: process.stdout,
  stderr: process.stderr
})
//pug template rendering happens in express server.js
