define(
  [
    "intern!object",
    "intern!bdd",
    "intern/dojo/node!fs",
    "intern/chai!expect"
  ],
  function (
    registerSuite,
    bdd,
    fs,
    expect
  ) {
    bdd.describe("- IndexPage", function() {
      var indexPageUrl = "http://localhost:8080",
      btnSignIn = "btnSignIn",
      btnUseApiEmail = "btnUseApiEmail",
      txtEmail = "input#txtEmail",
      txtPassword = "input#txtPassword";

      bdd.before(function () {
        // TODO: tear up the server
      });


      bdd.describe("> page title", function() {
        bdd.it("is correct", function() {
          var test = this.remote
            .get(indexPageUrl)
              .getPageTitle()
              .then(function(pageTitle) {
                expect(pageTitle).to.equal("POC-Dalek");
              })
              .end();

            return test;
        });
      });

      bdd.describe("> page sign in form", function() {
        bdd.describe('clicking on "Use API email"', function() {
          bdd.it("should fills the email input with the http.response user.email", function() {
            var test = this.remote
              .get(indexPageUrl)
                .findById(btnUseApiEmail)
                  .click()
                  .sleep(5000)
                  .end()
                .findByCssSelector(txtEmail)
                  .getProperty("value")
                  .then(function(text) {
                    expect(text).to.equal("lscastro@daitangroup.com");
                  })
                  .end();

            return test;
          });

          // bdd.it("should disable it until it gets a response from the server", function() {
          //   var test = this.remote
          //     .get(indexPageUrl)
          //       .findById(btnUseApiEmail)
          //       .click()
          //       .getAttribute("disabled")
          //         .then(function(isDisabled) {
          //           expect(isDisabled).to.be.true;
          //         })
          //       .sleep(5000)
          //       .getAttribute("disabled")
          //         .then(function(isDisabled) {
          //           console.log("bbb");
          //           expect(isDisabled).to.be.false;
          //         })
          //         .end();
          //
          //   return test;
          // });
        });

        bdd.describe('clicking on "sign in" button', function () {
          bdd.it("go to the success page for user admin@daitangroup.com/123", function() {
            var test = this.remote
              .get(indexPageUrl)
                .findByCssSelector(txtEmail)
                  .type("admin@daitangroup.com")
                  .end()
                .findByCssSelector(txtPassword)
                  .type("123")
                  .end()
                .takeScreenshot()
                  .then(function(data) {
                    fs.writeFileSync('/home/lscastro/workspace/leonardosarmentocastro/intern-tutorial/tests/resources/screenshots/index.functional.sign-in-success.png', data, "base64");
                  })
                  .end()
                .findById(btnSignIn)
                  .click()
                  .end()
                .getCurrentUrl()
                  .then(function(currentUrl) {
                    expect(currentUrl).to.contain("/success");
                  })
                  .end();

            return test;
          });

          bdd.it("go to the error page for other email/password combinations", function() {
            var test = this.remote
              .get(indexPageUrl)
                .findByCssSelector(txtEmail)
                  .type("fooUser@email.com")
                  .end()
                .findByCssSelector(txtPassword)
                  .type("789")
                  .end()
                .takeScreenshot()
                  .then(function(data) {
                    fs.writeFileSync('/home/lscastro/workspace/leonardosarmentocastro/intern-tutorial/tests/resources/screenshots/index.functional.sign-in-wrong.png', data, "base64");
                  })
                  .end()
                .findById(btnSignIn)
                  .click()
                  .end()
                .getCurrentUrl()
                  .then(function(currentUrl) {
                    expect(currentUrl).to.contain("/error");
                  })
                  .end();

            return test;
          });
        });

        bdd.describe("must have", function() {
          bdd.it("an email input", function() {
            var test = this.remote
              .get(indexPageUrl)
                .findByCssSelector(txtEmail)
                .then(function(emailInput) {
                  expect(emailInput).to.not.be.empty;
                })
                .end();

            return test;
          });

          bdd.it("an password input", function() {
            var test = this.remote
              .get(indexPageUrl)
                .findByCssSelector(txtPassword)
                .then(function(passwordInput) {
                  expect(passwordInput).to.not.be.empty;
                })
                .end();
          });
        });
      });


    });
});
