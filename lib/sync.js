"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startIntervalSync = exports.initialSync = void 0;
const eth_1 = require("./eth");
const database_1 = require("./database");
const log_1 = require("./log");
async function initialSync(token, api) {
    const currentBlock = await eth_1.getCurrentBlockNumber();
    const maxKnown = await database_1.getLatestBlockNumberForSymbol(token.symbol);
    log_1.logger.info("Inital Sync", { currentBlock, maxKnown });
    let i;
    if (maxKnown) {
        i = Math.max(token.scanFrom, maxKnown + 1);
    }
    else {
        i = token.scanFrom;
    }
    const chunks = Math.ceil((currentBlock - token.scanFrom) / token.interval);
    log_1.logger.info(`Start syncing token,`, { symbol: token.symbol, chunks });
    for (; i <= currentBlock; i += token.interval) {
        log_1.logger.info(`Loading txs at heights`, { from: i, to: i + token.interval });
        await getAndSaveBlocks(api, i, i + token.interval);
    }
    log_1.logger.info(`Finished syncing token`, { symbol: token.symbol });
}
exports.initialSync = initialSync;
async function startIntervalSync(token, api) {
    log_1.logger.info(`Starting interval sync for token`, { symbol: token.symbol });
    const maxKnown = await database_1.getLatestBlockNumberForSymbol(token.symbol);
    const currentBlock = await eth_1.getCurrentBlockNumber();
    if (maxKnown) {
        await getAndSaveBlocks(api, maxKnown + 1, currentBlock);
    }
    let currentHeight = currentBlock;
    setInterval(async () => {
        log_1.logger.info(`New tick refreshing`, { symbol: token.symbol });
        const newHeight = await eth_1.getCurrentBlockNumber();
        const blocksBehind = 6;
        await getAndSaveBlocks(api, currentHeight - blocksBehind, newHeight - blocksBehind);
        currentHeight = newHeight;
    }, 10 * 1000);
}
exports.startIntervalSync = startIntervalSync;
async function getAndSaveBlocks(api, from, to) {
    const txs = await api.getTransactionsFromBlock(from, to);
    log_1.logger.info("Found transactions for blocks", { from, to, count: txs.length });
    txs.forEach((tx) => {
        database_1.Transaction.create({
            ...tx,
            contract: api.address,
            symbol: api.symbol,
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUF3RDtBQUV4RCx5Q0FBd0U7QUFDeEUsK0JBQStCO0FBRXhCLEtBQUssVUFBVSxXQUFXLENBQUMsS0FBa0IsRUFBRSxHQUFhO0lBQ2pFLE1BQU0sWUFBWSxHQUFHLE1BQU0sMkJBQXFCLEVBQUUsQ0FBQztJQUNuRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdDQUE2QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxZQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELElBQUksQ0FBQyxDQUFDO0lBQ04sSUFBSSxRQUFRLEVBQUU7UUFDWixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFHLFFBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7U0FBTTtRQUNMLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO0tBQ3BCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNFLFlBQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLE9BQU8sQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUM3QyxZQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3BEO0lBQ0QsWUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBakJELGtDQWlCQztBQUVNLEtBQUssVUFBVSxpQkFBaUIsQ0FBQyxLQUFrQixFQUFFLEdBQWE7SUFDdkUsWUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMxRSxNQUFNLFFBQVEsR0FBRyxNQUFNLHdDQUE2QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxNQUFNLFlBQVksR0FBRyxNQUFNLDJCQUFxQixFQUFFLENBQUM7SUFDbkQsSUFBSSxRQUFRLEVBQUU7UUFDWixNQUFNLGdCQUFnQixDQUFDLEdBQUcsRUFBRyxRQUFtQixHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztLQUNyRTtJQUNELElBQUksYUFBYSxHQUFHLFlBQVksQ0FBQztJQUNqQyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsWUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM3RCxNQUFNLFNBQVMsR0FBRyxNQUFNLDJCQUFxQixFQUFFLENBQUM7UUFDaEQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sZ0JBQWdCLENBQ3BCLEdBQUcsRUFDSCxhQUFhLEdBQUcsWUFBWSxFQUM1QixTQUFTLEdBQUcsWUFBWSxDQUN6QixDQUFDO1FBQ0YsYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2hCLENBQUM7QUFuQkQsOENBbUJDO0FBRUQsS0FBSyxVQUFVLGdCQUFnQixDQUFDLEdBQWEsRUFBRSxJQUFZLEVBQUUsRUFBVTtJQUNyRSxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekQsWUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUNqQixzQkFBVyxDQUFDLE1BQU0sQ0FBQztZQUNqQixHQUFHLEVBQUU7WUFDTCxRQUFRLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEN1cnJlbnRCbG9ja051bWJlciwgVG9rZW5BcGkgfSBmcm9tIFwiLi9ldGhcIjtcbmltcG9ydCB7IFRva2VuQ29uZmlnIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IGdldExhdGVzdEJsb2NrTnVtYmVyRm9yU3ltYm9sLCBUcmFuc2FjdGlvbiB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi9sb2dcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxTeW5jKHRva2VuOiBUb2tlbkNvbmZpZywgYXBpOiBUb2tlbkFwaSkge1xuICBjb25zdCBjdXJyZW50QmxvY2sgPSBhd2FpdCBnZXRDdXJyZW50QmxvY2tOdW1iZXIoKTtcbiAgY29uc3QgbWF4S25vd24gPSBhd2FpdCBnZXRMYXRlc3RCbG9ja051bWJlckZvclN5bWJvbCh0b2tlbi5zeW1ib2wpO1xuICBsb2dnZXIuaW5mbyhcIkluaXRhbCBTeW5jXCIsIHsgY3VycmVudEJsb2NrLCBtYXhLbm93biB9KTtcbiAgbGV0IGk7XG4gIGlmIChtYXhLbm93bikge1xuICAgIGkgPSBNYXRoLm1heCh0b2tlbi5zY2FuRnJvbSwgKG1heEtub3duIGFzIG51bWJlcikgKyAxKTtcbiAgfSBlbHNlIHtcbiAgICBpID0gdG9rZW4uc2NhbkZyb207XG4gIH1cbiAgY29uc3QgY2h1bmtzID0gTWF0aC5jZWlsKChjdXJyZW50QmxvY2sgLSB0b2tlbi5zY2FuRnJvbSkgLyB0b2tlbi5pbnRlcnZhbCk7XG4gIGxvZ2dlci5pbmZvKGBTdGFydCBzeW5jaW5nIHRva2VuLGAsIHsgc3ltYm9sOiB0b2tlbi5zeW1ib2wsIGNodW5rcyB9KTtcbiAgZm9yICg7IGkgPD0gY3VycmVudEJsb2NrOyBpICs9IHRva2VuLmludGVydmFsKSB7XG4gICAgbG9nZ2VyLmluZm8oYExvYWRpbmcgdHhzIGF0IGhlaWdodHNgLCB7IGZyb206IGksIHRvOiBpICsgdG9rZW4uaW50ZXJ2YWwgfSk7XG4gICAgYXdhaXQgZ2V0QW5kU2F2ZUJsb2NrcyhhcGksIGksIGkgKyB0b2tlbi5pbnRlcnZhbCk7XG4gIH1cbiAgbG9nZ2VyLmluZm8oYEZpbmlzaGVkIHN5bmNpbmcgdG9rZW5gLCB7IHN5bWJvbDogdG9rZW4uc3ltYm9sIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnRJbnRlcnZhbFN5bmModG9rZW46IFRva2VuQ29uZmlnLCBhcGk6IFRva2VuQXBpKSB7XG4gIGxvZ2dlci5pbmZvKGBTdGFydGluZyBpbnRlcnZhbCBzeW5jIGZvciB0b2tlbmAsIHsgc3ltYm9sOiB0b2tlbi5zeW1ib2wgfSk7XG4gIGNvbnN0IG1heEtub3duID0gYXdhaXQgZ2V0TGF0ZXN0QmxvY2tOdW1iZXJGb3JTeW1ib2wodG9rZW4uc3ltYm9sKTtcbiAgY29uc3QgY3VycmVudEJsb2NrID0gYXdhaXQgZ2V0Q3VycmVudEJsb2NrTnVtYmVyKCk7XG4gIGlmIChtYXhLbm93bikge1xuICAgIGF3YWl0IGdldEFuZFNhdmVCbG9ja3MoYXBpLCAobWF4S25vd24gYXMgbnVtYmVyKSArIDEsIGN1cnJlbnRCbG9jayk7XG4gIH1cbiAgbGV0IGN1cnJlbnRIZWlnaHQgPSBjdXJyZW50QmxvY2s7XG4gIHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICBsb2dnZXIuaW5mbyhgTmV3IHRpY2sgcmVmcmVzaGluZ2AsIHsgc3ltYm9sOiB0b2tlbi5zeW1ib2wgfSk7XG4gICAgY29uc3QgbmV3SGVpZ2h0ID0gYXdhaXQgZ2V0Q3VycmVudEJsb2NrTnVtYmVyKCk7XG4gICAgY29uc3QgYmxvY2tzQmVoaW5kID0gNjtcbiAgICBhd2FpdCBnZXRBbmRTYXZlQmxvY2tzKFxuICAgICAgYXBpLFxuICAgICAgY3VycmVudEhlaWdodCAtIGJsb2Nrc0JlaGluZCxcbiAgICAgIG5ld0hlaWdodCAtIGJsb2Nrc0JlaGluZFxuICAgICk7XG4gICAgY3VycmVudEhlaWdodCA9IG5ld0hlaWdodDtcbiAgfSwgMTAgKiAxMDAwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QW5kU2F2ZUJsb2NrcyhhcGk6IFRva2VuQXBpLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpIHtcbiAgY29uc3QgdHhzID0gYXdhaXQgYXBpLmdldFRyYW5zYWN0aW9uc0Zyb21CbG9jayhmcm9tLCB0byk7XG4gIGxvZ2dlci5pbmZvKFwiRm91bmQgdHJhbnNhY3Rpb25zIGZvciBibG9ja3NcIiwgeyBmcm9tLCB0bywgY291bnQ6IHR4cy5sZW5ndGggfSk7XG4gIHR4cy5mb3JFYWNoKCh0eCkgPT4ge1xuICAgIFRyYW5zYWN0aW9uLmNyZWF0ZSh7XG4gICAgICAuLi50eCxcbiAgICAgIGNvbnRyYWN0OiBhcGkuYWRkcmVzcyxcbiAgICAgIHN5bWJvbDogYXBpLnN5bWJvbCxcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=