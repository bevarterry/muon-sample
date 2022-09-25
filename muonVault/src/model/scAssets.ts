export interface ScAssets {
  bitcoin: ScAssetInfo;
  ethereum: ScAssetInfo;
  binance: ScAssetInfo;
  usdc: ScAssetInfo;
  muon: ScAssetInfo;
}

export interface ScAssetInfo {
  symbol: string;
  displayName: string;
  contractAddress?: string;
  totalValue: number;
  ratio?: number;
}
