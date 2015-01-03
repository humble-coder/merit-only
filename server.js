var http = require('http'),
express = require('express'),
exphbs = require('express-handlebars'),
app = express(),
handlebars = exphbs.create({defaultLayout: 'main'}),
mongoose = require('mongoose'),
bodyParser = require('./bodyParser.js'),
credentials = require('./credentials.js');

var opts = {
	server: {
		socketOptions: { keepAlive: 1}
	}
};

mongoose.connect(credentials.mongo.development.connectionString, opts);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.use(function(req, res, next) {
	var data = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk) {
		data += chunk;
	});

	req.on('end', function() {
		req.body = data;
		next();
	});
});

app.get('/', function(req, res) {
	res.render('home', {pageTestScript: 'qa/tests-home.js'});
});

app.get('/applicant/:id', function(req, res) {
	res.render('applicant');
});

app.post('/save-applicant', function(req, res) {
  var applicant = bodyParser.parse(req.body);
  credentials.
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
