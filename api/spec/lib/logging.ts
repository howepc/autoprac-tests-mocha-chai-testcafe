import { createLogger, format, transports } from "winston";
const { combine, label, printf } = format;

//  LogSettings.defaultLogLevel value set at the top of each spec file:
//      "error" for production tests
//      "info" for describe & it labels (GWT statements)
//      "verbose" for building/troubleshooting
export class LogSettings {
    public static defaultLogLevel: string = "error";
}

const logFormat = printf((info) => {
    return `${info.label} (${info.level}): ${info.message}`;
});

export function createConsoleLogger(level?: string) {
    return createLogger({
        format: combine(
            format.splat(),
            label({ label: "LOG" }),
            logFormat,
        ),
        level: level || LogSettings.defaultLogLevel,
        transports: [new transports.Console()],
    });
}
