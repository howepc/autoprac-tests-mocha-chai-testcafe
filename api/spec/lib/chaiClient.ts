import chai = require("chai");
import chaiHttp = require("chai-http");
chai.use(chaiHttp);

import { Request } from "superagent";
import { Logger } from "winston";
import { createConsoleLogger } from "./logging";

export class ChaiClient {
    private logger: Logger;

    constructor(private endpoint: string, private headers?: object) {
        this.logger = createConsoleLogger();
    }

    public get(url: string): Request {
        this.logger.verbose("GET: " + url);
        return this.invoke(url, (agent) => agent.get);
    }

    public post(url: string): Request {
        this.logger.verbose("POST: " + url);
        return this.invoke(url, (agent) => agent.post);
    }

    public put(url: string): Request {
        this.logger.verbose("PUT: " + url);
        return this.invoke(url, (agent) => agent.put);
    }

    public del(url: string): Request {
        this.logger.verbose("DELETE: " + url);
        return this.invoke(url, (agent) => agent.del);
    }

    public patch(url: string): Request {
        this.logger.verbose("PATCH: " + url);
        return this.invoke(url, (agent) => agent.patch);
    }

    private invoke(url: string, method:
        (agent: ChaiHttp.Agent) => ((url: string, callback?: (err: any, res: ChaiHttp.Response) => void) => Request)) {

        const agent = chai.request(this.endpoint);

        const methodFunc = method(agent);
        let request = methodFunc(url);

        if (this.headers) {
            request = request.set(this.headers);
        }

        return request;
    }
}
