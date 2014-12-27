var http = require('http'),
express = require('express'),
exphbs = require('express-handlebars'),
app = express(),
handlebars = exphbs.create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get('/', function(req, res) {
	res.render('home', {pageTestScript: 'qa/tests-home.js'});
});

app.get('/applicant', function(req, res) {
	res.render('applicant', {pageTestScript: 'qa/tests-applicant.js'});
});

app.use(function(req, res, next) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('App started on http://localhost:' + app.get('port') +'; press Ctrl-C to end.');
});