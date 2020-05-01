import { isNumber } from "lodash";

// SLEEP
// example call "await sleep(100);"
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface IRandomIntSettings {
    high: number;
    low?: number;
}

// RANDOM INTEGER
export function randomInt(settings: IRandomIntSettings | number) {
    if (isNumber(settings)) {
        settings = {
            high: settings,
            low: 0,
        };
    }

    return Math.floor((Math.random() * settings.high) + (settings.low || 0));
}
