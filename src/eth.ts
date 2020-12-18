import Eth from "ethjs";
import { TokenConfig } from "./index";
import { hexToDec } from "hex2dec";
import { addressToLower, hexToAddress } from "./helper";
const abi = require("./abi.json");
const config = require("../config.json");

const eth = new Eth(new Eth.HttpProvider(config.infura));

const erc20contract = eth.contract(abi);
// const ten = new Eth.BN("10");

const transferTopic =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

export interface TokenApi {
  symbol: string;
  decimals: number;
  address: string;
  getTransactionsFromBlock: (
    from: number,
    to: number
  ) => Promise<Erc20Transaction[]>;
}

export interface Erc20Transaction {
  hash: string;
  amount: number;
  sender: string;
  receiver: string;
  block: number;
}

export async function getCurrentBlockNumber(): Promise<number> {
  const res = await eth.blockNumber();
  return Number(res);
}

export async function generateTokenApi(token: TokenConfig): Promise<TokenApi> {
  const contract = erc20contract.at(token.contract);
  const decimals = await contract.decimals();
  // const divider = ten.pow(decimals[0]);
  const getTransactionsFromBlock = async (
    from: number,
    to: number
  ): Promise<Erc20Transaction[]> => {
    const txs = await eth.getLogs({
      fromBlock: new Eth.BN(String(from)),
      toBlock: new Eth.BN(String(to)),
      address: token.contract,
      topics: [transferTopic],
    });
    return txs.map((tx: any) => ({
      hash: tx.transactionHash,
      amount: addressToLower(hexToDec(tx.data)),
      sender: addressToLower(hexToAddress(tx.topics[1])),
      receiver: addressToLower(hexToAddress(tx.topics[2])),
      block: Number(tx.blockNumber.toString()),
    }));
  };

  return {
    symbol: token.symbol,
    decimals: Number(decimals[0].toString()),
    address: token.contract,
    getTransactionsFromBlock,
  };
}
