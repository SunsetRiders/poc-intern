// *** Different ways to load dependencies under tests
// Instead of injecting the dependencies under the "define(function (require) { var library = require("library"); //... })"
// define the required libraries on a array by providing their paths of loading
// and assign them on the function declaration "function(registerSuite, assert, expect, fs)"

define(
  [
    "intern!object",
    "intern!bdd",
    "intern/chai!expect",
    "intern/dojo/node!nock/index"
  ],
  function (
    registerSuite,
    bdd,
    expect,
    nock
  ) {
    bdd.describe("test", function() {
      bdd.it("clicking", function () {
        nock("http://www.mocky.io/")
          .get("v2/579b9d71100000b905dc8a8d")
          .reply(
            200,
            {
              user: {
                id: 999,
                name: "Juliano"
              }
            }
          );


        return this.remote
          .get(require.toUrl("index.html"))
          .findById("btnApiIntegration")
            .click()
            .sleep(5000)
            .end()
          .findById("apiResult")
            .getVisibleText()
            .then(function(text) {
              expect(text).to.equal("Juliano");
            })
            .end();
      });
    });

    // registerSuite({
    //     name: 'index',
    //
    //     'greeting form': function () {
    //       return this.remote
    //               .get(require.toUrl('index.html'))
    //               .setFindTimeout(5000)
    //               .findByCssSelector('body.loaded')
    //               .findById('nameField')
    //                   .click()
    //                   .type('Leonardo')
    //                   .end()
    //               .findByCssSelector('#loginForm input[type=submit]')
    //                   .click()
    //                   .end()
    //               .findById('greeting')
    //               .getVisibleText()
    //               .then(function (text) {
    //                 expect(text).to.equal("Hello, Leonardo!");
    //
    //                 assert.strictEqual(text, 'Hello, Leonardo!',
    //                     'Greeting should be displayed when the form is submitted');
    //               })
    //               .takeScreenshot()
    //                 .then(function(data) {
    //                   fs.writeFileSync('/home/lscastro/workspace/leonardosarmentocastro/intern-tutorial/screenshot.png', data, "base64");
    //                 })
    //                 .end();
    //     }
    // });
});

// .takeScreenshot()
//   .then(function(data) {
//     fs.writeFileSync('/home/lscastro/workspace/leonardosarmentocastro/intern-tutorial/screenshot.png', data, "base64");
//   })
//   .end()
