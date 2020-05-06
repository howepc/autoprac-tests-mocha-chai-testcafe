Param(
    [switch]
    $NPMInstallSkip,

    # If browser is not specified, tests are run in headless Chrome per 'ui/.testcaferc.json'.
    [string]
    [ValidateSet("chrome", "firefox", "ie", "edge", "opera", "safari", "all")]  # all = all installed browsers from the list
    $Browser,

    [string]
    [ValidateSet("qa", "prod")]
	$Env = "qa",

    [string]
    [ValidateSet("regression", "smoke")]
    $Set = "regression",
    
    [string]
    [ValidateSet("api", "ui", "both")]
    $Type = "both",
    
    [string]
    $CSVfile, ## file name of CSV file in ../spec/data folder.
    
    [string]
    $APIKey = $env:API_KEY
)

Switch ($Type) {
    "api" {Write-Output "Running API ${Set} tests."}

    "ui" {
        if (!$Browser) {
            Write-Output "Running UI ${Set} tests in headless Chrome."
        } else {
            Write-Output "Running UI ${Set} tests in a local ${Browser} browser."
        }
    }

    default {
        if (!$Browser) {
            Write-Output "Running API and UI ${Set} tests in headless Chrome."
        } else {
            Write-Output "Running API and UI ${Set} tests in a local ${Browser} browser."
        }
    }
}

try
{
    # Load environment variables
    $env:TEST_ENV = $Env
    $env:API_KEY = $APIKey
    $env:TEST_DATA_CSV = $CSVfile

    if ($Type -eq "api" -Or $Type -eq "both") {
        Set-Location api
        if ($NPMInstallSkip -eq $false) {
            npm install
        }
        Remove-Item dist -Recurse -Force
        npm run build
        if ($Set -eq "smoke") {
            npm run apismoke
        } else {
            npm run apiregression
        }
        Set-Location ..
    }

    if ($Type -eq "ui" -Or $Type -eq "both") {
        Set-Location ui
        if ($NPMInstallSkip -eq $false) {
            npm install
        }
        # Set TestCafe runtime config to appropriate test file specs
        if ($Set -eq "regression") { # run ALL tests
            npm run tests $Browser spec/*.test/**/*.spec.ts
        } else { # run only smoke tests
            npm run tests $Browser spec/smoke.test/**/*.spec.ts
        }
        Set-Location ..
    }

    exit $LastExitCode

} catch {
	Write-Error $_
	exit 1
} finally {
    $env:TEST_ENV = ""
    $env:TEST_DATA_CSV = ""
}
