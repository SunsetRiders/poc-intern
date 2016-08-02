# POC - The Intern
A "proof of concept" to guide through this Unit and functional test library - https://theintern.github.io/

## What Will be covered?
- [First steps when beggining a new project](https://github.com/leonardosarmentocastro/poc-theintern#first-steps-when-beginning-a-new-project)
- [Running the "unit test runner"](https://github.com/leonardosarmentocastro/poc-theintern#running-the-unit-test-runner)
- [Generating unit test code coverage reporters](https://github.com/leonardosarmentocastro/poc-theintern#generating-unit-test-code-coverage-reporters)
- [Running headless browser functional tests](https://github.com/leonardosarmentocastro/poc-theintern#running-headless-browser-functional-tests)
    - [POC project walkthrough](https://github.com/leonardosarmentocastro/poc-theintern#--poc-project-walkthrough)
    - [Intern.js walkthrough](https://github.com/leonardosarmentocastro/poc-theintern#--internjs-walkthrough)
- [Documentation](https://github.com/leonardosarmentocastro/poc-theintern#documentation)
    - [Functional test methods](https://github.com/leonardosarmentocastro/poc-theintern#--functional-test-methods)
    - [Unit test assertion library](https://github.com/leonardosarmentocastro/poc-theintern#--unit-test-assertion-library)

## First steps when beginning a new project
1. Install intern as a dependency to your project
    ```sh
    $ npm install --save-dev intern
    ```

2. Install "intern-client" globally
    ```sh
    $ npm install intern-client -g
    ```
    *NOTE:* Installing this package will enable the use of "intern-client" and "intern-runner" on your terminal.


3. Create a folder called "tests" under your project application root folder
    ```sh
    $ cd your-project/
    $ mkdir tests
    $ mkdir tests/functional
    $ mkdir tests/unit
    ```

4. In order to run your tests, Intern needs a configuration file.
There is a pre-defined one by the Intern team at the dependency folder, you can copy it to your project by doing:
    ```sh
    $ cd your-project/ # if you haven't done so
    $ cp node_modules/intern/tests/example.intern.js tests/intern.js
    ```

5. After creating a test file on the "unit" or "functional" folder, we need to registry this test suit to be run by Intern
(otherwise this test will be ignored by the test runner)

    5.1. Assuming that you created a test file on
      ```sh
      $ cd your-project/ # if you haven't done so
      $ touch tests/unit/hello.bdd.interface.js
      $ touch tests/unit/hello.tdd.interface.js
      ```
    
    5.2. Open the previously copied "intern.js" configuration file
    ```sh
    $ vim tests/intern.js # use the text editor of your choice
    ```
    
    5.3 Find the property "suites":
    ```js
    // Unit test suite(s) to run in each browser
    suites: [ /* 'myPackage/tests/foo', 'myPackage/tests/bar' */ ],
    ```
    
    5.4 And add your tests path
    ```js
    suites: [ "tests/unit/hello.bdd.interface", "tests/unit/hello.tdd.interface" ],
    ```
    
    5.5 [Run the "unit test runner"](https://github.com/leonardosarmentocastro/poc-theintern#running-the-unit-test-runner)

**First steps COMPLETE!**

### Optional steps

6. Create a functional test, add to the "intern.js" configuration file and run it on a headless browser
    
    6.1. Create a functional test file
    ```sh
    $ cd your-project/ # if you haven't done so
    $ touch tests/functional/index.functional.test.js
    ```

    6.2. Open the "intern.js" configuration file
    ```sh
    $ vim tests/intern.js # use the text editor of your choice
    ```

    6.3. Find the property "functionalSuites":
    ```js
    // Functional test suite(s) to execute against each browser once unit tests are completed
    functionalSuites: [ /* 'myPackage/tests/functional' */ ],
    ```

    6.4 And add your test path
    ```js
    suites: [ "tests/functional/index.functional.test.js" ],
    ```

    6.5 The next steps to run your functional tests are on the "Running headless browser functional tests" section

**Optional steps COMPLETE!**


## Running the "unit test runner"
Simple run
```sh
$ intern-client config=tests/intern
```

To send custom parameters to be available on you test suites
```sh
$ intern-client config=tests/intern hasToSkipMyTest=true
```

Then it will be available at your tests suit js file by using
```js
if(intern.args.hasToSkipMyTest) {
  this.skip("Reason why this test should be skipped");
}
```

**Running the "unit test runner" COMPLETE!**

## Generating unit test code coverage reporters
Run the "intern-client" with a "reporters" parameters

E.g.
```sh
$ intern-client config=tests/intern reporters=LcovHtml
```
This will create a folder called "html-report" on the root of your project("istanbul" like)
Open the "index.html" file to see the results
```sh
$ cd intern-tutorial/

# this will work if you have configured a default browser properly, otherwise, open it by using your OS "finder"
$ open html-report/index.html
```

The available values for "reporters" are:
```sh
reporters=Cobertura
reporters=Combined
reporters=Lcov
reporters=LcovHtml
```

For any extra information, check out the documentation:
https://theintern.github.io/intern/#reporter-lcov


## Running headless browser functional tests
**There are two small steps to accomplish this:**
1. The "POC project walkthrough"
2. The "Intern.js walkthrough"

### POC project walkthrough
1. Start the simple "node.js" server

    1.1. Navigate to the project root folder
    ```sh
    $ cd intern-tutorial/
    ```

    And run
    ```sh
    $ node app/server/server.js
    ```

    Server is now running at "http://localhost:8080/"

### - Intern.js walkthrough
1. Download the latest version of PhantomJS

    1.1. It's available at http://phantomjs.org/download.html (or use the ".tar.gz" file available on the "resources/" folder)

    1.2. Extract it on a folder of your preference
    Lets pretend you did it on "~/Downloads/phantomjs"
    ```sh
    $ cd ~/Downloads/
    $ tar -xzf phantomjs-2.1.1-linux-x86_64
    ```

    2. Run **"phantomjs"**

        2.1 Navigate to the folder where you extracted the "phantomjs.tar.gz"
        Assuming that you did it on "~/Downloads/phantomjs"
        ```sh
        $ cd ~/Downloads/phantomjs/bin
        $ ./phantomjs --webdriver=4444
        ```

    3. Editing **"tests/intern.js"** configuration file properties

        3.1. Set **"tunnel"** property to **'NullTunnel'**
        ```js
        tunnel: "NullTunnel",
        tunnelOptions: {

        },
        // ...
        ```

        3.2 Set your environments capabilities to **"phantomjs"**
        ```js
        environments: [
        { browserName: 'phantomjs' }
        ],
        // ...
        ```

    4. Run the **"Intern.js"** test runner

        4.1 Open a new shell(terminal) instance and run
        ```sh
        $ intern-runner config=tests/intern
        ```

**Running headless browser tests COMPLETE!**

*NOTE:* I notice that the "phantomjs" tries to run all your "unit" and "functional" tests when calling the "intern-runner".

So if you want to isolate your functional tests, create a separate "intern.js" configuration file called "intern-phantomjs.js" and
specify only "functionalSuites" and leave unit test "suites" empty.

## Documentation
### - Functional test methods
- [**Leadfoot**](https://theintern.github.io/leadfoot/module-leadfoot_Command.html)

### - Unit test assertion library
- [**Chai.js**](http://chaijs.com/api/)
