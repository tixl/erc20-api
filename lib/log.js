"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenObjectValues = exports.configureLogger = exports.logger = void 0;
const winston_1 = __importStar(require("winston"));
const apex_logs_winston_1 = __importDefault(require("apex-logs-winston"));
const { printf, combine, timestamp } = winston_1.format;
const myFormat = combine(timestamp(), printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
}));
const defaultLogger = winston_1.default.createLogger({
    transports: [],
    level: "info",
});
if (process.env.NODE_ENV !== "production") {
    defaultLogger.add(new winston_1.default.transports.Console({
        format: myFormat,
    }));
}
exports.logger = defaultLogger;
const configureLogger = (url, authToken, projectId, net, service) => {
    if (!url || !authToken || !projectId)
        return;
    const apex = new apex_logs_winston_1.default({
        url,
        authToken,
        projectId,
    });
    exports.logger = winston_1.default.createLogger({
        transports: [apex],
        level: "debug",
        defaultMeta: { net, service },
    });
    if (process.env.NODE_ENV !== "production") {
        exports.logger.add(new winston_1.default.transports.Console({
            format: myFormat,
        }));
    }
};
exports.configureLogger = configureLogger;
const shortenObjectValues = (o, max = 32) => {
    const n = {};
    for (const key in o) {
        const val = o[key];
        if (typeof val === "string") {
            n[key] = val.slice(0, max);
        }
        else {
            n[key] = o[key];
        }
    }
    return n;
};
exports.shortenObjectValues = shortenObjectValues;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTBDO0FBQzFDLDBFQUFrRDtBQUVsRCxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxnQkFBTSxDQUFDO0FBRTlDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FDdEIsU0FBUyxFQUFFLEVBQ1gsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDdkMsT0FBTyxHQUFHLFNBQVMsSUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUVGLE1BQU0sYUFBYSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDO0lBQ3pDLFVBQVUsRUFBRSxFQUFFO0lBQ2QsS0FBSyxFQUFFLE1BQU07Q0FDZCxDQUFDLENBQUM7QUFDSCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtJQUN6QyxhQUFhLENBQUMsR0FBRyxDQUNmLElBQUksaUJBQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQzdCLE1BQU0sRUFBRSxRQUFRO0tBQ2pCLENBQUMsQ0FDSCxDQUFDO0NBQ0g7QUFDVSxRQUFBLE1BQU0sR0FBbUIsYUFBYSxDQUFDO0FBQzNDLE1BQU0sZUFBZSxHQUFHLENBQzdCLEdBQXVCLEVBQ3ZCLFNBQTZCLEVBQzdCLFNBQTZCLEVBQzdCLEdBQXVCLEVBQ3ZCLE9BQTJCLEVBQzNCLEVBQUU7SUFDRixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUztRQUFFLE9BQU87SUFDN0MsTUFBTSxJQUFJLEdBQUcsSUFBSSwyQkFBaUIsQ0FBQztRQUNqQyxHQUFHO1FBQ0gsU0FBUztRQUNULFNBQVM7S0FDVixDQUFDLENBQUM7SUFDSCxjQUFNLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUM7UUFDNUIsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ2xCLEtBQUssRUFBRSxPQUFPO1FBQ2QsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTtLQUM5QixDQUFDLENBQUM7SUFDSCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtRQUN6QyxjQUFNLENBQUMsR0FBRyxDQUNSLElBQUksaUJBQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQzdCLE1BQU0sRUFBRSxRQUFRO1NBQ2pCLENBQUMsQ0FDSCxDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUF6QlcsUUFBQSxlQUFlLG1CQXlCMUI7QUFDSyxNQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBTSxFQUFFLE1BQWMsRUFBRSxFQUFFLEVBQUU7SUFDOUQsTUFBTSxDQUFDLEdBQVEsRUFBRSxDQUFDO0lBQ2xCLEtBQUssTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFO1FBQ25CLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakI7S0FDRjtJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDO0FBWFcsUUFBQSxtQkFBbUIsdUJBVzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdpbnN0b24sIHsgZm9ybWF0IH0gZnJvbSBcIndpbnN0b25cIjtcbmltcG9ydCBBcGV4TG9nc1RyYW5zcG9ydCBmcm9tIFwiYXBleC1sb2dzLXdpbnN0b25cIjtcblxuY29uc3QgeyBwcmludGYsIGNvbWJpbmUsIHRpbWVzdGFtcCB9ID0gZm9ybWF0O1xuXG5jb25zdCBteUZvcm1hdCA9IGNvbWJpbmUoXG4gIHRpbWVzdGFtcCgpLFxuICBwcmludGYoKHsgbGV2ZWwsIG1lc3NhZ2UsIHRpbWVzdGFtcCB9KSA9PiB7XG4gICAgcmV0dXJuIGAke3RpbWVzdGFtcH0gJHtsZXZlbH06ICR7bWVzc2FnZX1gO1xuICB9KVxuKTtcblxuY29uc3QgZGVmYXVsdExvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgdHJhbnNwb3J0czogW10sXG4gIGxldmVsOiBcImluZm9cIixcbn0pO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBkZWZhdWx0TG9nZ2VyLmFkZChcbiAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgZm9ybWF0OiBteUZvcm1hdCxcbiAgICB9KVxuICApO1xufVxuZXhwb3J0IGxldCBsb2dnZXI6IHdpbnN0b24uTG9nZ2VyID0gZGVmYXVsdExvZ2dlcjtcbmV4cG9ydCBjb25zdCBjb25maWd1cmVMb2dnZXIgPSAoXG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBhdXRoVG9rZW46IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgcHJvamVjdElkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIG5ldDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcgfCB1bmRlZmluZWRcbikgPT4ge1xuICBpZiAoIXVybCB8fCAhYXV0aFRva2VuIHx8ICFwcm9qZWN0SWQpIHJldHVybjtcbiAgY29uc3QgYXBleCA9IG5ldyBBcGV4TG9nc1RyYW5zcG9ydCh7XG4gICAgdXJsLFxuICAgIGF1dGhUb2tlbixcbiAgICBwcm9qZWN0SWQsXG4gIH0pO1xuICBsb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gICAgdHJhbnNwb3J0czogW2FwZXhdLFxuICAgIGxldmVsOiBcImRlYnVnXCIsXG4gICAgZGVmYXVsdE1ldGE6IHsgbmV0LCBzZXJ2aWNlIH0sXG4gIH0pO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgbG9nZ2VyLmFkZChcbiAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICAgIGZvcm1hdDogbXlGb3JtYXQsXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn07XG5leHBvcnQgY29uc3Qgc2hvcnRlbk9iamVjdFZhbHVlcyA9IChvOiBhbnksIG1heDogbnVtYmVyID0gMzIpID0+IHtcbiAgY29uc3QgbjogYW55ID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIG8pIHtcbiAgICBjb25zdCB2YWwgPSBvW2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG5ba2V5XSA9IHZhbC5zbGljZSgwLCBtYXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuW2tleV0gPSBvW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuO1xufTtcbiJdfQ==