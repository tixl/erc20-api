import { TokenApi } from "./eth";
import { TokenConfig } from "./index";
export declare function initialSync(token: TokenConfig, api: TokenApi): Promise<void>;
export declare function startIntervalSync(token: TokenConfig, api: TokenApi): Promise<void>;
