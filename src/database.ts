import { Sequelize, DataTypes, Model } from "sequelize";
const sqlite = require("sqlite3");
const config = require("../config.json");
import fs from "fs";

const sequelize = new Sequelize({ dialect: "sqlite", storage: config.dbpath });

export interface DBTransaction {
  symbol: string;
  hash: string;
  sender: string;
  receiver: string;
  amount: number;
  block: number;
  contract: string;
}

export const Transaction = sequelize.define<Model<DBTransaction>>(
  "Transaction",
  {
    symbol: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    sender: { type: DataTypes.STRING, allowNull: false },
    receiver: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    block: { type: DataTypes.INTEGER, allowNull: false },
    contract: { type: DataTypes.STRING, allowNull: false },
  }
);

export async function init() {
  if (!fs.existsSync(config.dbpath)) {
    new sqlite.Database(config.dbpath);
  }
  await Transaction.sync();
}

export async function getLatestBlockNumberForSymbol(symbol: string) {
  const max = await Transaction.max("block", {
    where: {
      symbol,
    },
  });
  return max;
}

export async function getTransactionsToForSymbol(
  symbol: string,
  receiver: string
) {
  return Transaction.findAll({
    where: { symbol, receiver },
    order: [["block", "DESC"]],
  });
}
export async function getTransactionsFromForSymbol(
  symbol: string,
  sender: string
) {
  return Transaction.findAll({
    where: { symbol, sender },
    order: [["block", "DESC"]],
  });
}
