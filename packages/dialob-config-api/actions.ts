import { Config } from "./types";

export type ConfigAction =
  | { type: 'setConfig', config: Config}
  
  ;
