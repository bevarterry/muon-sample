export interface VaultList {
  vaults: Array<Vault>;
}
export interface Vault {
  id?: string;
  name: string;
  BTC: string;
  BNB: string;
  USDC: string;
  ETH: string;
}
