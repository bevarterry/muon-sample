export interface VaultList {
  vaults: Array<Vault>;
}
export interface Vault {
  idx: string;
  id: string;
  name: string;
  BTC: number;
  BNB: number;
  USDC: number;
  ETH: number;
  VP: number;
  color: string;
}
