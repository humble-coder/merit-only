module.exports = {
  "Applicant submits form (successfully)" : function (browser) {
    browser
      .url("localhost:3000")
      .waitForElementVisible('body', 1000)
      .setValue('#firstName', 'Ashley')
      .setValue('#lastName', 'Riot')
      .setValue('#email', 'ashley@riskbreakers.com')
      .setValue('#phoneNumber', '555-555-5555')
      .click('input[type=submit]')
      .pause(1000)
      .assert.containsText('#message', 'Application Completed')
      .end();
  }
};