console.log('starting express....')
var express = require('express'),
  path = require('path'),
  app = express(),
  port = 9393,
  livereload = require('express-livereload');

livereload(app, {watchDir: '../dist'})

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../dist')));
//
app.get('/', function(req, res) {
  res.render('index', {
    title: 'the puzzle room'
  });
});

//
app.listen(port);

console.log('serving http on localhost 9393');
