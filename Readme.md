## ERC20 API
This service queries transactions of ERC20 contracts via Infura.io. It will store them in a db and let's you query the transcations by symbol and sender / receiver. 
## Config

- dbpath: path to sqlite file, usually ./db/storeq.sqlite
- infura: infura url
- tokens: array of objects, that represent the tokens to track:

```
symbol: Symbol used for querying, e.g. WBTC
contract: Contract address in hex format. Must be erc20 contract
scanFrom: Number, start scanning here
interval: Number, amount of blocks that will be queried together. Bugg interval = more calls to infura.
```

## API

`/:symbol/to/:address` get all transactions of symbol by receiver
`/:symbol/from/:address` get all transactions of symbol by sender
