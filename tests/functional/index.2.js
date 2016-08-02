// *** Different ways to load dependencies under tests
// Inject the dependencies under the "define(function (require) { //... })" and use the intern libraries
// or the ones that comes with the "npm install intern"

define(function (require) {
    var registerSuite = require('intern!object'),
    assert = require('intern/chai!assert'),
    expect = require('intern/chai!expect'),
    fs = require("intern/dojo/node!fs");


    registerSuite({
        name: 'index',

        "Any name you want to": function () {
          // > .get(require.toUrl('index.html'))
          // "require.toUrl" access static files without the need of a real webserver

          return this.remote
                  .get(require.toUrl('index.html'))
                  .setFindTimeout(5000)
                  .findByCssSelector('body.loaded')
                  .findById('nameField')
                      .click()
                      .type('Leonardo')
                      .end()
                  .findByCssSelector('#loginForm input[type=submit]')
                      .click()
                      .end()
                  .findById('greeting')
                  .getVisibleText()
                  .then(function (text) {
                    expect(text).to.equal("Hello, Leonardo!");

                    assert.strictEqual(text, 'Hello, Leonardo!',
                        'Greeting should be displayed when the form is submitted');
                  })
                  .takeScreenshot()
                    .then(function(data) {
                      fs.writeFileSync('/home/lscastro/workspace/leonardosarmentocastro/intern-tutorial/screenshot.png', data, "base64");
                    })
                    .end();
        }
    });
});
