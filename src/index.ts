import { initialSync, startIntervalSync } from "./sync";
import { generateTokenApi, TokenApi } from "./eth";
import { configureLogger, logger } from "./log";
require("./api");
const config = require("../config.json");

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'local_with_logger') {
  configureLogger(
    process.env.APEX_URL,
    process.env.APEX_AUTH,
    process.env.APEX_PROJECT,
    process.env.NET,
    process.env.SERVICE,
  );
}

export interface TokenConfig {
  symbol: string;
  contract: string;
  scanFrom: number;
  interval: number;
}

(async function main() {
  const apis = new Map<string, TokenApi>();
  await Promise.all(
    config.tokens.map(async (token: TokenConfig) => {
      const api = await generateTokenApi(token);
      apis.set(token.symbol, api);
    })
  );
  for (const token of config.tokens) {
    const api = apis.get(token.symbol)!;
    logger.info(`Do initial sync for ${token.symbol}`);
    await initialSync(token, api);
  }

  config.tokens.forEach(async (token: TokenConfig) => {
    const api = apis.get(token.symbol)!;
    startIntervalSync(token, api);
  });
})();
