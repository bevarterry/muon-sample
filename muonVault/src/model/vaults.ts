export interface VaultList {
  vaults: Array<Vault>;
  totalAssets: TotalAssets;
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

export interface TotalAssets {
  bitcoin: number;
  ethereum: number;
  binance: number;
  usdc: number;
  muon: number;
}
