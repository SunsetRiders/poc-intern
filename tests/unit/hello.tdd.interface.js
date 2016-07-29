// *** EXECUTE IT BY RUNNING
// $ intern-client config=tests/intern hasToSkipMyTest=true
// NOTE: "hasToSkipMyTest" is a custom argument provided by us that can be used with "intern.args." internally by our tests
define(
  [
    "intern!tdd",
    "intern",
    "intern/chai!assert",
    "intern/chai!expect",
    "intern/chai!should",
    "intern/dojo/node!supertest/index",
    "app/hello"
  ],
  function (
    tdd,
    intern,
    assert,
    expect,
    should,
    request,
    hello
  ) {
    should(); // Notice that "should()" is actually called as a function!

    tdd.suite("> app/hello.js - FIRST_TEST_SUITE", function() {
      // *** DECLARING VARIABLES THAT WILL HOLD VALUES THAT WILL BE MODIFIED BY TESTS
      let holdingVariablesThatAreModifiedByTests = 0;

      // *** BUILT-IN METHODS
      // Any variable declared on the "BUILT-IN METHODS" are avaiable for ALL the "TEST CASES" on this suite/sub-suites
      tdd.before(function () {
        let beforeValue = "";

        beforeValue = "[TDD-INTERFACE]   [BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (after) - Executes before the suite starts, CAN'T also be called 'before' instead of 'setup'..";
        console.log(beforeValue);
      });

      tdd.after(function () {
        let afterValue = "";

        afterValue = "[TDD-INTERFACE]   [BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (after) - Executes after the suite ends, , CAN'T also be called 'after' instead of 'teardown'.";
        console.log(afterValue);
      });

      tdd.beforeEach(function () {
        let beforeEachValue = "";

        beforeEachValue = "[TDD-INTERFACE]   [BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (beforeEach) - Executes before each test.";
        console.log(beforeEachValue);
      });

      tdd.afterEach(function () {
        let afterEachValue = "";

        afterEachValue = "[TDD-INTERFACE]   [BUILT-IN FUNCTIONS][FIRST_TEST_SUITE] (afterEach) - Executes after each test.";
        console.log(afterEachValue);
      });

      // *** TESTS CASES
      tdd.test("greet", function () {
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
      });

      tdd.test("Any name you want to", function () {
        let helloWithName = hello.greet("Leonardo");
        expect(helloWithName).to.equal("Hello, Leonardo!");
      });

      tdd.test("Skipping a test depending on an argument passed by the command line", function () {
        let testThatWillFail = "foo";

        if(intern.args.hasToSkipMyTest) {
          this.skip("Reason why this test should be skipped");
        }

        expect(testThatWillFail).to.equal("bar");
      });


      // *** SUB-SUITE OF TESTS (declare it as a object, not a function as done with tests)
      tdd.suite("> app/hello.js - NESTED_TEST_SUITE", function() {
        // *** SUB-SUITE BUILT-IN METHODS
        tdd.before(function () {
          let nestedTestSuite_beforeValue = "";

          nestedTestSuite_beforeValue = "[TDD-INTERFACE]   [BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (before) - Executes before the suite starts, CAN'T also be called 'before' instead of 'setup'.";
          console.log(nestedTestSuite_beforeValue);
        });

        tdd.after(function () {
          let nestedTestSuite_afterValue = "";

          nestedTestSuite_afterValue = "[TDD-INTERFACE]   [BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (after) - Executes after the suite ends, CAN'T also be called 'after' instead of 'teardown'.";
          console.log(nestedTestSuite_afterValue);
        });

        tdd.beforeEach(function () {
          let nestedTestSuite_beforeEachValue = "";

          nestedTestSuite_beforeEachValue = "[TDD-INTERFACE]   [BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (beforeEach) - Executes before each test.";
          console.log(nestedTestSuite_beforeEachValue);
        });

        tdd.afterEach(function () {
          let nestedTestSuite_afterEachValue = "";

          nestedTestSuite_afterEachValue = "[TDD-INTERFACE]   [BUILT-IN FUNCTIONS]  [NESTED_TEST_SUITE] (afterEach) - Executes after each test.";
          console.log(nestedTestSuite_afterEachValue);
        });

        // *** SUB-SUITE TESTS CASES
        tdd.test("testCase", function () {
          let testCase = "testCase";
          expect(testCase).to.equal("testCase");

          holdingVariablesThatAreModifiedByTests += 1;
          expect(holdingVariablesThatAreModifiedByTests).to.equal(1);
          console.log("[DEBUG] holdingVariablesThatAreModifiedByTests: " + holdingVariablesThatAreModifiedByTests);
        });

        tdd.test("Another test-case", function () {
          let anotherTestCase = "Another test-case";
          expect(anotherTestCase).to.equal("Another test-case");

          holdingVariablesThatAreModifiedByTests += 1;
          expect(holdingVariablesThatAreModifiedByTests).to.equal(2);
          console.log("[DEBUG] holdingVariablesThatAreModifiedByTests: " + holdingVariablesThatAreModifiedByTests);
        });
      });

    });
});
