export interface VaultList {
  vaults: Array<Vault>;
}
export interface Vault {
  id?: string;
  name: string;
  BTC: number;
  BNB: number;
  USDC: number;
  ETH: number;
  MU: number;
  color: string;
}
