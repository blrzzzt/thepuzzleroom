const express = require('express'),
	app = express(),
	path = require('path'),
	port = 9393,
	sF = `[${path.basename(__filename)}]`,
	publicDir = path.resolve('dist'),
	pug = require('pug'),
	reload = require('reload'),
	morgan = require('morgan');

console.log(`${sF} starting express...`);

/// Render engine
app.engine('pug', require('pug')
	.__express);
app.set('view engine', 'pug')
app.set('views', path.resolve('views'));


///REST
app.get('/', (req, res) => {
	res.render('index', {
		title: 'the puzzle room'
	})
});



///Server Start
let server = app.listen((process.env.PORT || port), function () {
	app.use(express.static(publicDir))
	console.log(`${sF} serving from ${publicDir} on port ${port}`);
});

reload(server, app, true)
app.use(morgan('dev'))
