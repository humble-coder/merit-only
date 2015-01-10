var http = require('http'),
util = require('util'),
express = require('express'),
exphbs = require('express-handlebars'),
formidable = require('formidable'),
app = express(),
handlebars = exphbs.create({defaultLayout: 'main'}),
mongoose = require('mongoose'),
credentials = require('./credentials.js'),
Applicant = require('./models/applicant.js');

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

// app.use(function(req, res, next) {
// 	var data = '';
// 	req.setEncoding('utf8');
// 	req.on('data', function(chunk) {
// 		data += chunk;
// 		console.log(data);
// 	});

// 	req.on('end', function() {
// 		req.body = data;
// 		next();
// 	});
// });

app.get('/', function(req, res) {
	res.render('home', {pageTestScript: 'qa/tests-home.js'});
});

app.post('/save-applicant', function(req, res) {
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = 'uploads';
	form.keepExtensions = true;
	form.parse(req, function(err, fields, files) {
		
		// var applicant = new Applicant({
		// 	name: fields.firstName + ' ' + fields.lastName,
		// 	email: fields.email,
		// 	phoneNumber: fields.phoneNumber,
		// 	resume: files
		// })
	});
  // var applicant = new Applicant({
  // 	name: applicantData.firstName + ' ' + applicantData.lastName,
  // 	email: applicantData.email,
  // 	phoneNumber: applicantData.phoneNumber
  // });
  // applicant.save(function(err, applicant, numAffected) {
  // 	if (applicant)
  // 		res.redirect(303, '/applicant/' + applicant.id);
  // });
});

app.get('/applicant/:id', function(req, res) {
	Applicant.findById(req.params.id, function(err, applicant) {
		if (applicant)
			res.render('applicant', applicant);
	});
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
