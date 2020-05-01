const envConfig = {
    // All Environment names MUST be UPPER CASE and in $TestEnv vars in runtests.ps1
    // NOTE: Addition fields MUST be added to "QA" here and to "env" object at end of this file
    // NOTE: It's ony necessary to specify values that differ from QA in each environment
    QA: {
        url: "http://automationpractice.com",
        custEmail: "autopract@gmail.com",
        custPassword: "password",
    },
    PROD: {
        url: "http://automationpractice.com",   // replace with production URL
    },
};

const testEnv = (process.env.TEST_ENV || "QA").toUpperCase();
if (typeof envConfig[testEnv] === "undefined") {
    throw new Error(testEnv + " is not a valid environment in ui/spec/data/environment.dat.ts");
} else {
    console.log("Setting environment to: " + testEnv + "\n");
}

// Copy all values from PROD to testEnv used
if (testEnv !== "QA") {
    envConfig[testEnv] = Object.assign(envConfig.QA, envConfig[testEnv]);
}

export const env = {
    url: envConfig[testEnv].url,
    custEmail: envConfig[testEnv].custEmail,
    custPassword: envConfig[testEnv].custPassword,
};
