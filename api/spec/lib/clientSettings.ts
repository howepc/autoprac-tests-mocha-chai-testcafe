import { env } from "../data/environment.dat";
import { ChaiClient } from "./chaiClient";

const DEFAULT_HEADERS: { [index: string]: string } = {
    "apiGateWayKey": process.env.API_KEY,
    "Content-Type": "application/json",
};

export function createClient(endpoint?: string, headers: { [index: string]: string } = DEFAULT_HEADERS):
    ChaiClient {
        if (endpoint == null)  {
            endpoint = env.endpoint;
        }
        return new ChaiClient(endpoint, headers);
    }
