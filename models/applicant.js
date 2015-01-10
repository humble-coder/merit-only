var mongoose = require('mongoose');

var applicantSchema = mongoose.Schema({
	name: String,
	email: String,
	phoneNumber: String
});

var Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;