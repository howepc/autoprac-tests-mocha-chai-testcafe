// Imports
import {
    createConsoleLogger,
    LogSettings,
} from "../lib/logging";

import { createClient } from "../lib/clientSettings";

import chai = require("chai");
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import chaiSubset = require("chai-subset");
chai.use(chaiSubset);

// Log settings
LogSettings.defaultLogLevel = "info";   // set to "verbose" for building/troubleshooting, "error" for production

const logger = createConsoleLogger();
const client = createClient();

logger.info("Smoke Test Sample: No actual test is performed");

describe("Smoke Test: Perform Health Checks", () => {

    describe("Checking Health Status", () => {

        it("GET /health", async () => {
            // const res = await client
            //     .get(`/health`);

            // logger.verbose("=============================================================");
            // logger.verbose(JSON.stringify(res.body));
            // logger.verbose("=============================================================");
        // chai.expect(res).to.have.status(200);
        });

        it("GET /health?type=ready", async () => {
            // const res = await client
            //     .get(`/health?type=ready`);

            // logger.verbose("=============================================================");
            // logger.verbose(JSON.stringify(res.body));
            // logger.verbose("=============================================================");
            // chai.expect(res).to.have.status(200);
        });
    });
});
