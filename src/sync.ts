import { getCurrentBlockNumber, TokenApi } from "./eth";
import { TokenConfig } from "./index";
import { getLatestBlockNumberForSymbol, Transaction } from "./database";

export async function initialSync(token: TokenConfig, api: TokenApi) {
  const currentBlock = await getCurrentBlockNumber();
  const maxKnown = await getLatestBlockNumberForSymbol(token.symbol);
  console.log({ currentBlock, maxKnown });
  let i;
  if (maxKnown) {
    i = Math.max(token.scanFrom, (maxKnown as number) + 1);
  } else {
    i = token.scanFrom;
  }
  const chunks = Math.ceil((currentBlock - token.scanFrom) / token.interval);
  console.log(`Start syncing token ${token.symbol}. ${chunks} ahead.`);
  for (; i <= currentBlock; i += token.interval) {
    console.log(`Loading txs from height ${i} to ${i + token.interval}`);
    await getAndSaveBlocks(api, i, i + token.interval);
  }
  console.log(`Finished syncing token ${token.symbol}`);
}

export async function startIntervalSync(token: TokenConfig, api: TokenApi) {
  console.log(`Starting interval sync for ${token.symbol}`);
  const maxKnown = await getLatestBlockNumberForSymbol(token.symbol);
  const currentBlock = await getCurrentBlockNumber();
  if (maxKnown) {
    await getAndSaveBlocks(api, (maxKnown as number) + 1, currentBlock);
  }
  let currentHeight = currentBlock;
  setInterval(async () => {
    console.log(`New tick, refreshing ${token.symbol}`);
    const newHeight = await getCurrentBlockNumber();
    await getAndSaveBlocks(api, currentHeight, newHeight);
    currentHeight = newHeight;
  }, 120 * 1000);
}

async function getAndSaveBlocks(api: TokenApi, from: number, to: number) {
  const txs = await api.getTransactionsFromBlock(from, to);
  console.log(`Found ${txs.length} txs for block #${from}-#${to}`);
  txs.forEach((tx) => {
    console.log(
      `${tx.hash}: ${tx.sender} ---(${tx.amount} ${api.symbol})---> ${tx.receiver} at height ${tx.block}`
    );
    Transaction.create({
      ...tx,
      contract: api.address,
      symbol: api.symbol,
    });
  });
}
