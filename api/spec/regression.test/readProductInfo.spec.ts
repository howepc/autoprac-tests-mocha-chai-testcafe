// Imports
import { createClient } from "../lib/clientSettings";
import { createConsoleLogger, LogSettings } from "../lib/logging";
import { randomInt } from "../lib/util";

import chai = require("chai");
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import chaiSubset = require("chai-subset");
chai.use(chaiSubset);

import { v1 as uuid } from "uuid";

// Log settings
LogSettings.defaultLogLevel = "info"; // set to "verbose" for building/troubleshooting, "error" for production

const logger = createConsoleLogger();
const client = createClient();

// values from pre-loaded Couchebase data (add/change/remove as needed)
const validProductId = uuid();
const rndInt = randomInt(10000);  // use to make test data unique for this test

logger.info("Regression Test Sample: No actual product data is modified or read");

describe("Product Info", () => {

    before(async () => {

        logger.verbose("Setup: create Product");

        // const res = await client
        //     .put(`/v1/products/${validProductId}`)
        //     .send({
        //         code: "S1" + rndInt,
        //         name: "TestProduct-" + rndInt,
        //         type: 14,
        //     });
        // chai.expect(res).to.have.status(201);
    });

    describe("Get Product Info - Bad Request 400 Response", () => {

        it("Invalid productId format", async () => {

            // const invalidProductId = validProductId + "A";

            // const res = await client
            //     .get(`/v1/products/${invalidProductId}`);
            // chai.expect(res).to.have.status(400);
        });

        it("Nonexistent productId", async () => {

            // const invalidProductId = uuid();

            // const res = await client
            //     .get(`/v1/products/${invalidProductId}`);
            // chai.expect(res).to.have.status(400);
        });
    });

    describe("Get Product Info - Success 200 Response", () => {

        it("Get Product Info Successfully", async () => {

            // const res = await client
            //     .get(`/v1/products/${validProductId}`);
            // chai.expect(res).to.have.status(200);
        });
    });

    describe("Delete Product Info - Success 202 Response", () => {

        it("Delete Product info successfully", async () => {

            // const res = await client
            //     .del(`/v1/products/${validProductId}`);
            // chai.expect(res).to.have.status(202);
        });
    });

    describe("Get Product Info after deletion - Bad Request 400 Response", () => {

        it("Failure after deletion", async () => {

            // const res = await client
            //     .get(`/v1/products/${validProductId}`);
            // chai.expect(res).to.have.status(400);
        });
    });
});
