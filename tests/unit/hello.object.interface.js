// *** EXECUTE IT BY RUNNING
// $ intern-client config=tests/intern hasToSkipMyTest=true
// NOTE: "hasToSkipMyTest" is a custom argument provided by us that can be used with "intern.args." internally by our tests
define(
  [
    "intern",
    "intern!object",
    "intern/chai!assert",
    "intern/chai!expect",
    "intern/chai!should",
    "intern/dojo/node!supertest/index",
    "intern/dojo/node!http",
    "app/hello"
  ],
  function (
    intern,
    registerSuite,
    assert,
    expect,
    should,
    request,
    http,
    hello
  ) {
    should(); // Notice that "should()" is actually called as a function!

    registerSuite(function() {
      // *** DECLARING VARIABLES THAT WILL HOLD VALUES THAT WILL BE MODIFIED BY TESTS
      let holdingVariablesThatAreModifiedByTests = 0;

      return {
        name: "> app/hello.js - FIRST_TEST_SUITE",

        // *** BUILT-IN METHODS
        // Any variable declared on the "BUILT-IN METHODS" are avaiable for ALL the "TEST CASES" on this suite/sub-suites
        setup: function() {
          let setupValue = "";

          setupValue = "[OBJECT-INTERFACE]   [BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (setup) - Executes before the suite starts, can also be called 'before' instead of 'setup'.";
          console.log(setupValue);
        },
        teardown: function() {
          let teardownValue = "";

          teardownValue = "[OBJECT-INTERFACE]   [BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (teardown) - Executes after the suite ends, can also be called 'after' instead of 'teardown'.";
          console.log(teardownValue);
        },
        beforeEach: function() {
          let beforeEachValue = "";

          beforeEachValue = "[OBJECT-INTERFACE]   [BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (beforeEach) - Executes before each test.";
          console.log(beforeEachValue);
        },
        afterEach: function() {
          let afterEachValue = "";

          afterEachValue = "[OBJECT-INTERFACE]   [BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (afterEach) - Executes after each test.";
          console.log(afterEachValue);
        },

        // *** TESTS CASES
        greet: function() {
          // - The assertion can be used with any assert library provided by "Chai.js" (e.g. assert, expect and should)
          let helloWithName = hello.greet("Leonardo"),
          helloWithNoName = hello.greet();

          // > expect
          expect(helloWithName).to.equal("Hello, Leonardo!");
          expect(helloWithNoName).to.equal("Hello, world!");

          // assert
          assert.strictEqual(helloWithName, 'Hello, Leonardo!',
                  'hello.greet should return a greeting for the person named in the first argument');
          assert.strictEqual(helloWithNoName, 'Hello, world!',
              'hello.greet with no arguments should return a greeting to "world"');

          // > should
          helloWithName.should.equal("Hello, Leonardo!");
          helloWithNoName.should.equal("Hello, world!");
        },
        "Any name you want to": function() {
          let helloWithName = hello.greet("Leonardo");
          expect(helloWithName).to.equal("Hello, Leonardo!");
        },
        "Skipping a test depending on an argument passed by the command line": function() {
          let testThatWillFail = "foo";

          if(intern.args.hasToSkipMyTest) {
            this.skip("Reason why this test should be skipped");
          }

          expect(testThatWillFail).to.equal("bar");
        },
        "Asynchronous test": function() {
          // http://www.mocky.io/v2/579b64ea110000b01fcb776c
          let dfd = this.async(),
            expectedResponseBody = {
              "user": {
                "id": 1,
                "name": "Leonardo Sarmento de Castro"
              }
            };

          request("http://www.mocky.io/")
            .get("v2/579b64ea110000b01fcb776c")
            .then(function(response) {
              try {
                expect(response.body).to.be.deep.equal(expectedResponseBody);
              } catch(error) {
                console.log("BBBBBBBB");
                dfd.reject(error);
              }

              dfd.resolve();
            });
        },

        // *** SUB-SUITE OF TESTS (declare it as a object, not a function as done with tests)
        "Sub-suite of tests name": {
          name: "> app/hello.js - NESTED_TEST_SUITE",

          // *** SUB-SUITE BUILT-IN METHODS
          setup: function() {
            let nestedTestSuite_setupValue = "";

            nestedTestSuite_setupValue = "[OBJECT-INTERFACE]    [BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (setup) - Executes before the suite starts, can also be called 'before' instead of 'setup'.";
            console.log(nestedTestSuite_setupValue);
          },
          teardown: function() {
            let nestedTestSuite_teardownValue = "";

            nestedTestSuite_teardownValue = "[OBJECT-INTERFACE]   [BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (teardown) - Executes after the suite ends, can also be called 'after' instead of 'teardown'.";
            console.log(nestedTestSuite_teardownValue);
          },
          beforeEach: function() {
            let nestedTestSuite_beforeEachValue = "";

            nestedTestSuite_beforeEachValue = "[OBJECT-INTERFACE]   [BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (beforeEach) - Executes before each test.";
            console.log(nestedTestSuite_beforeEachValue);
          },
          afterEach: function() {
            let nestedTestSuite_afterEachValue = "";

            nestedTestSuite_afterEachValue = "[OBJECT-INTERFACE]   [BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (afterEach) - Executes after each test.";
            console.log(nestedTestSuite_afterEachValue);
          },

          // *** SUB-SUITE TESTS CASES
          testCase: function () {
            let testCase = "testCase";
            expect(testCase).to.equal("testCase");

            holdingVariablesThatAreModifiedByTests += 1;
            expect(holdingVariablesThatAreModifiedByTests).to.equal(1);
            console.log("[DEBUG] holdingVariablesThatAreModifiedByTests: " + holdingVariablesThatAreModifiedByTests);
          },
          "Another test-case": function() {
            let anotherTestCase = "Another test-case";
            expect(anotherTestCase).to.equal("Another test-case");

            holdingVariablesThatAreModifiedByTests += 1;
            expect(holdingVariablesThatAreModifiedByTests).to.equal(2);
            console.log("[DEBUG] holdingVariablesThatAreModifiedByTests: " + holdingVariablesThatAreModifiedByTests);
          }
        }

      }
    });
});
