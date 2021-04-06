import winston from "winston";
export declare let logger: winston.Logger;
export declare const configureLogger: (url: string | undefined, authToken: string | undefined, projectId: string | undefined, net: string | undefined, service: string | undefined) => void;
export declare const shortenObjectValues: (o: any, max?: number) => any;
