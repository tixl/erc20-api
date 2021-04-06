import { TokenConfig } from "./index";
export interface TokenApi {
    symbol: string;
    decimals: number;
    address: string;
    getTransactionsFromBlock: (from: number, to: number) => Promise<Erc20Transaction[]>;
}
export interface Erc20Transaction {
    hash: string;
    amount: number;
    sender: string;
    receiver: string;
    block: number;
}
export declare function getCurrentBlockNumber(): Promise<number>;
export declare function generateTokenApi(token: TokenConfig): Promise<TokenApi>;
