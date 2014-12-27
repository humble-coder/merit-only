suite('Home page tests', function() {
	var form = HTML.query('#applicantForm');
	test('page should display applicant form', function() {
		assert(form.length);
	});
	test('form should contain contact-information section', function() {
		var contactSection = form.query('#contactInformation');
		assert(contactSection.nodeType);
	});
});