suite('Scrambled-applicant-page tests', function() {
	var applicant = HTML.query('#applicant');
	test('page should display applicant', function() {
		assert(applicant.nodeType);
	});
});