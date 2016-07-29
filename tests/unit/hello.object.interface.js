define(function (require) {
    const registerSuite = require('intern!object'),
      assert = require('intern/chai!assert'),
      expect = require('intern/chai!expect'),
      should = require('intern/chai!should')(); // Notice that "should()" is actually called as a function!
    const hello = require('app/hello');

    registerSuite(function() {
      // *** DECLARING VARIABLES THAT WILL HOLD VALUES THAT WILL BE MODIFIED BY TESTS
      let holdingVariablesThatAreModifiedByTests = 0;

      return {
        name: "> app/hello.js - FIRST_TEST_SUITE",

        // *** BUILT-IN METHODS
        // Any variable declared on the "BUILT-IN METHODS" are avaiable for ALL the "TEST CASES" on this suite/sub-suites
        setup: function() {
          let setupValue = "";

          setupValue = "[BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (setup) - Executes before the suite starts, can also be called 'before' instead of 'setup'.";
          console.log(setupValue);
        },
        teardown: function() {
          let teardownValue = "";

          teardownValue = "[BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (teardown) - Executes after the suite ends, can also be called 'after' instead of 'teardown'.";
          console.log(teardownValue);
        },
        beforeEach: function() {
          let beforeEachValue = "";

          beforeEachValue = "[BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (beforeEach) - Executes before each test.";
          console.log(beforeEachValue);
        },
        afterEach: function() {
          let afterEachValue = "";

          afterEachValue = "[BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (afterEach) - Executes after each test.";
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

        // *** SUB-SUITE OF TESTS (declare it as a object, not a function as done with tests)
        "Sub-suite of tests name": {
          name: "> app/hello.js - NESTED_TEST_SUITE",

          // *** SUB-SUITE BUILT-IN METHODS
          setup: function() {
            let nestedTestSuite_setupValue = "";

            nestedTestSuite_setupValue = "[BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (setup) - Executes before the suite starts, can also be called 'before' instead of 'setup'.";
            console.log(nestedTestSuite_setupValue);
          },
          teardown: function() {
            let nestedTestSuite_teardownValue = "";

            nestedTestSuite_teardownValue = "[BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (teardown) - Executes after the suite ends, can also be called 'after' instead of 'teardown'.";
            console.log(nestedTestSuite_teardownValue);
          },
          beforeEach: function() {
            let nestedTestSuite_beforeEachValue = "";

            nestedTestSuite_beforeEachValue = "[BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (beforeEach) - Executes before each test.";
            console.log(nestedTestSuite_beforeEachValue);
          },
          afterEach: function() {
            let nestedTestSuite_afterEachValue = "";

            nestedTestSuite_afterEachValue = "[BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (afterEach) - Executes after each test.";
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
