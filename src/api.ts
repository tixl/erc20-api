import express from "express";
import cors from "cors";
import {
  getTransactionsToForSymbol,
  getTransactionsFromForSymbol,
  getTransactionByHashForSymbol,
} from "./database";
import { addressToLower } from "./helper";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    maxAge: 7200,
  })
);

// Get transactions to
app.get("/:symbol/to/:address", async (req, res) => {
  const symbol = req.params.symbol;
  const address = req.params.address;
  if (!address || !symbol) return res.status(400).send("Missing params");
  try {
    const transactions = await getTransactionsToForSymbol(
      symbol,
      addressToLower(address)
    );
    return res.json({ transactions });
  } catch (error) {
    console.error("/:symbol/to/:address", { error });
    return res.status(500).send(error);
  }
});

// Get transactions from
app.get("/:symbol/from/:address", async (req, res) => {
  const symbol = req.params.symbol;
  const address = req.params.address;
  if (!address || !symbol) return res.status(400).send("Missing params");
  try {
    const transactions = await getTransactionsFromForSymbol(
      symbol,
      addressToLower(address)
    );
    return res.json({ transactions });
  } catch (error) {
    console.error("/:symbol/to/:address", { error });
    return res.status(500).send(error);
  }
});

// Get transactions by hash
app.get("/:symbol/hash/:hash", async (req, res) => {
  const symbol = req.params.symbol;
  const hash = req.params.hash;
  if (!hash || !symbol) return res.status(400).send("Missing params");
  try {
    const transaction = await getTransactionByHashForSymbol(
      symbol,
      addressToLower(hash)
    );
    return res.json({ transaction });
  } catch (error) {
    console.error("/:symbol/hash/:hash", { error });
    return res.status(500).send(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Service is listening on port ${port}`);
});
