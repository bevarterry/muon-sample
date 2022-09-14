export interface Vault {
  id?: string;
  name: string;
}

export interface ScAssetInfo {
  symbol: string;
  displayName: string;
  contractAddress?: string;
  totalValue?: string;
  ratio?: number;
}
