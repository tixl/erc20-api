import { Model } from "sequelize";
export interface DBTransaction {
    symbol: string;
    hash: string;
    sender: string;
    receiver: string;
    amount: number;
    block: number;
    contract: string;
}
export declare const Transaction: import("sequelize/types").ModelCtor<Model<DBTransaction, DBTransaction>>;
export declare function init(): Promise<void>;
export declare function getLatestBlockNumberForSymbol(symbol: string): Promise<unknown>;
export declare function getTransactionsToForSymbol(symbol: string, receiver: string): Promise<Model<DBTransaction, DBTransaction>[]>;
export declare function getTransactionsFromForSymbol(symbol: string, sender: string): Promise<Model<DBTransaction, DBTransaction>[]>;
export declare function getTransactionByHashForSymbol(symbol: string, hash: string): Promise<Model<DBTransaction, DBTransaction> | null>;
