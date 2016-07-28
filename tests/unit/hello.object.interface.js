define(function (require) {
    const registerSuite = require('intern!object'),
      assert = require('intern/chai!assert'),
      expect = require('intern/chai!expect'),
      should = require('intern/chai!should')(); // Notice that "should()" is actually called as a function!
    const hello = require('app/hello');

    registerSuite({
      name: "> app/hello.js",

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
      }

    });
});
