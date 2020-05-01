const envConfig = {
    // All Environment names MUST be UPPER CASE and in $TestEnv vars in runtests.ps1
    // NOTE: Addition fields MUST be added to "QA" here and to "env" object at end of this file
    // NOTE: It's ony necessary to specify values that differ from QA in each environment
    QA: {
        endpoint: "https://api.qa.automationpractice.com",
    },
    PROD: {
        endpoint: "https://api.automationpractice.com",
    },
};

const testEnv = (process.env.TEST_ENV || "QA").toUpperCase();
if (typeof envConfig[testEnv] === "undefined") {
    throw new Error(testEnv + " is not a valid environment in api/spec/data/environment.dat.ts");
} else {
    console.log("Setting environment to: " + testEnv + "\n");
}

// Copy all values from PROD to testEnv used
if (testEnv !== "QA") {
    envConfig[testEnv] = Object.assign(envConfig.QA, envConfig[testEnv]);
}

export const env = {
    endpoint: envConfig[testEnv].endpoint,
};
