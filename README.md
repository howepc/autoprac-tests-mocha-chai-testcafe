# AutoPrac Tests

This provides a framework for API and UI testing written in TypeScript using all open-source components. These tests are designed to run against the http://automationpractice.com website.

UI tests utilize TestCafe and employ data and page objects separate from the tests.

API tests, using a Mocha framework and Chai assertions, <b>perform no actual tests</b> and report successes, but provide the scaffolding for when API documentation becomes available.

## Running API Tests

API tests require the service to be running in the cloud behind the API gateway.  It also requires the correct API Gateway Key to authenticate into the cluster.
<pre>
.\RunTests.ps1 -Type api -Set smoke -APIKey 12345ABCDE
</pre>

## Running Tests

Run the tests from within the root folder. Defaults to running the full suite of API and UI tests, the latter within a Chrome headless browser.

From the project folder in a Powershell window run:.
<pre>
./runtests.ps1
</pre>

Run the tests locally on a chrome browser to watch them:
<pre>
./runtests.ps1 -Browser chrome
</pre>

The full set of options to run the tests:
<pre>
./runtests
 -Browser <b>chrome</b>|firefox|ie|edge|opera|safari|all
 -Env prod|<b>qa</b>|<i>other</i>
 -Set <b>regression</b>|smoke
 -Type api|ui|<b>both</b>
 -APIKey <i>value</i>|<b>(defaults from local environment var API_KEY)</b>
</pre>

Note1: Bolded values are the defaults
Note2: "all" as the browser will run in all installed browsers simultaneously. System resources may create issues with tests run this way.

typical run example:
<pre>
./runtests -Browser firefox -Set smoke -Env qa -NPMInstallSkip
</pre>

Shortcuts are availabe for selecting options. The following will results in the above command line:
<pre>
run[tab] -B[tab] f[tab] -s[tab] s[tab] -e[tab] q[tab] -n[tab]
</pre>

# Make This Test Suite Your Own
## Data
Data files are in api|ui/spec/data and may include environment configuration data as well as test data. Each data file must be imported into any spec file that will utilize it.

## Page Objects
* For UI tests, page objects and page-specific re-usable functions are in api|ui/spec/pages.
* All pages inherit objects common to the tested site from the main.pg.
* Any new pages should be added to the _index.pg file as a consistent method of importing pages.

## Helper Library
Helper functions are included in api|ui/spec/lib.

## Tests
The Test files themselves, also called spec files, are in api|ui/spec/regression.test|smoke.test folders. It's generally useful to copy a spec file similar to what you wish to create in order to start a new file. Just be sure you rename the file with a .spec.ts extension for the test runs to pick it up.

In both API tests and UI tests, you can specify a single (or set) of tests to run by placing <b>.only</b> after the test function:
* describe.only(
* it.only(
* test.only(

Similarly, tests not yet ready for primetime can be skipped with <b>.skip</b> instead of <b>.only</b>. Skipped tests are reported in the test result counts.

## Jenkins
To run these tests in Jenkins, a <i>jenkinsfile</i> is included in the root of the project with commands necessary to run the tests and report the results back to Jenkins.