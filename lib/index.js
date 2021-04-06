"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = require("./sync");
const eth_1 = require("./eth");
const log_1 = require("./log");
require("./api");
const config = require("../config.json");
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'local_with_logger') {
    log_1.configureLogger(process.env.APEX_URL, process.env.APEX_AUTH, process.env.APEX_PROJECT, process.env.NET, process.env.SERVICE);
}
(async function main() {
    const apis = new Map();
    await Promise.all(config.tokens.map(async (token) => {
        const api = await eth_1.generateTokenApi(token);
        apis.set(token.symbol, api);
    }));
    for (const token of config.tokens) {
        const api = apis.get(token.symbol);
        log_1.logger.info(`Do initial sync for ${token.symbol}`);
        await sync_1.initialSync(token, api);
    }
    config.tokens.forEach(async (token) => {
        const api = apis.get(token.symbol);
        sync_1.startIntervalSync(token, api);
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBd0Q7QUFDeEQsK0JBQW1EO0FBQ25ELCtCQUFnRDtBQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFekMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssbUJBQW1CLEVBQUU7SUFDekYscUJBQWUsQ0FDYixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDcEIsQ0FBQztDQUNIO0FBU0QsQ0FBQyxLQUFLLFVBQVUsSUFBSTtJQUNsQixNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztJQUN6QyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQWtCLEVBQUUsRUFBRTtRQUM3QyxNQUFNLEdBQUcsR0FBRyxNQUFNLHNCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0YsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRSxDQUFDO1FBQ3BDLFlBQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sa0JBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDL0I7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBa0IsRUFBRSxFQUFFO1FBQ2pELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRSxDQUFDO1FBQ3BDLHdCQUFpQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsU3luYywgc3RhcnRJbnRlcnZhbFN5bmMgfSBmcm9tIFwiLi9zeW5jXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVRva2VuQXBpLCBUb2tlbkFwaSB9IGZyb20gXCIuL2V0aFwiO1xuaW1wb3J0IHsgY29uZmlndXJlTG9nZ2VyLCBsb2dnZXIgfSBmcm9tIFwiLi9sb2dcIjtcbnJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWcuanNvblwiKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgfHwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdsb2NhbF93aXRoX2xvZ2dlcicpIHtcbiAgY29uZmlndXJlTG9nZ2VyKFxuICAgIHByb2Nlc3MuZW52LkFQRVhfVVJMLFxuICAgIHByb2Nlc3MuZW52LkFQRVhfQVVUSCxcbiAgICBwcm9jZXNzLmVudi5BUEVYX1BST0pFQ1QsXG4gICAgcHJvY2Vzcy5lbnYuTkVULFxuICAgIHByb2Nlc3MuZW52LlNFUlZJQ0UsXG4gICk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5Db25maWcge1xuICBzeW1ib2w6IHN0cmluZztcbiAgY29udHJhY3Q6IHN0cmluZztcbiAgc2NhbkZyb206IG51bWJlcjtcbiAgaW50ZXJ2YWw6IG51bWJlcjtcbn1cblxuKGFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IGFwaXMgPSBuZXcgTWFwPHN0cmluZywgVG9rZW5BcGk+KCk7XG4gIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIGNvbmZpZy50b2tlbnMubWFwKGFzeW5jICh0b2tlbjogVG9rZW5Db25maWcpID0+IHtcbiAgICAgIGNvbnN0IGFwaSA9IGF3YWl0IGdlbmVyYXRlVG9rZW5BcGkodG9rZW4pO1xuICAgICAgYXBpcy5zZXQodG9rZW4uc3ltYm9sLCBhcGkpO1xuICAgIH0pXG4gICk7XG4gIGZvciAoY29uc3QgdG9rZW4gb2YgY29uZmlnLnRva2Vucykge1xuICAgIGNvbnN0IGFwaSA9IGFwaXMuZ2V0KHRva2VuLnN5bWJvbCkhO1xuICAgIGxvZ2dlci5pbmZvKGBEbyBpbml0aWFsIHN5bmMgZm9yICR7dG9rZW4uc3ltYm9sfWApO1xuICAgIGF3YWl0IGluaXRpYWxTeW5jKHRva2VuLCBhcGkpO1xuICB9XG5cbiAgY29uZmlnLnRva2Vucy5mb3JFYWNoKGFzeW5jICh0b2tlbjogVG9rZW5Db25maWcpID0+IHtcbiAgICBjb25zdCBhcGkgPSBhcGlzLmdldCh0b2tlbi5zeW1ib2wpITtcbiAgICBzdGFydEludGVydmFsU3luYyh0b2tlbiwgYXBpKTtcbiAgfSk7XG59KSgpO1xuIl19