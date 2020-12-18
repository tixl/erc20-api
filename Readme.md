## ERC20 API

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
