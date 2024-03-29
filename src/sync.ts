import { getCurrentBlockNumber, TokenApi } from "./eth";
import { TokenConfig } from "./index";
import { getLatestBlockNumberForSymbol, Transaction } from "./database";
import { logger } from "./log";

const BLOCKS_BEHIND = process.env.BLOCKS_BEHIND ? Number(process.env.BLOCKS_BEHIND) : 6;
const REFRESH_TICK =  process.env.REFRESH_TICK ? Number(process.env.REFRESH_TICK) : 20;

export async function initialSync(token: TokenConfig, api: TokenApi) {
  const currentBlock = await getCurrentBlockNumber();
  const maxKnown = await getLatestBlockNumberForSymbol(token.symbol);
  logger.info("Inital Sync", { currentBlock, maxKnown });
  let i;
  if (maxKnown) {
    i = Math.max(token.scanFrom, (maxKnown as number) + 1);
  } else {
    i = token.scanFrom;
  }
  const chunks = Math.ceil((currentBlock - token.scanFrom) / token.interval);
  logger.info(`Start syncing token,`, { symbol: token.symbol, chunks });
  for (; i <= currentBlock; i += token.interval) {
    logger.info(`Loading txs at heights`, { from: i, to: i + token.interval });
    await getAndSaveBlocks(api, i, i + token.interval);
  }
  logger.info(`Finished syncing token`, { symbol: token.symbol });
}

export async function startIntervalSync(token: TokenConfig, api: TokenApi) {
  logger.info(`Starting interval sync for token`, { symbol: token.symbol });
  const maxKnown = await getLatestBlockNumberForSymbol(token.symbol);
  const currentBlock = await getCurrentBlockNumber();
  if (maxKnown) {
    await getAndSaveBlocks(api, (maxKnown as number) + 1, currentBlock);
  }
  let currentHeight = currentBlock;
  setInterval(async () => {
    logger.info(`New tick refreshing`, { symbol: token.symbol });
    const newHeight = await getCurrentBlockNumber();
    await getAndSaveBlocks(
      api,
      currentHeight - BLOCKS_BEHIND,
      newHeight - BLOCKS_BEHIND
    );
    currentHeight = newHeight;
  }, REFRESH_TICK * 1000);
}

async function getAndSaveBlocks(api: TokenApi, from: number, to: number) {
  const txs = await api.getTransactionsFromBlock(from, to);
  logger.info("Found transactions for blocks", { from, to, count: txs.length, symbol: api.symbol });
  txs.forEach((tx) => {
    Transaction.create({
      ...tx,
      contract: api.address,
      symbol: api.symbol,
    });
  });
}
