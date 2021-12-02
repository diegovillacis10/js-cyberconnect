export interface Connection {
  connectionType: string;
  target: string;
  namespace: string;
  createdAt: string;
  alias: string;
}

export type Connections = Connection[];

export enum Chain {
  ETH = 'ETH',
  SOLANA = 'SOLANA',
}

export interface CyberConnetStore {
  outboundLink: Connections;
}

export interface ConfigBase {
  namespace: string;
  env?: keyof typeof Env;
  provider: any;
}

export interface ConfigEth {
  chain?: Chain.ETH;
  chainRef?: never;
}

export interface ConfigSolana {
  chain: Chain.SOLANA;
  chainRef: string;
}

export type Config = ConfigBase & (ConfigEth | ConfigSolana);

export enum Env {
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}

export interface Endpoint {
  ceramicUrl: string;
  cyberConnectSchema: string;
  cyberConnectApi: string;
}
