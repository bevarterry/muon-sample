export interface CoinDetailType {
  icon?: any;
  value: number;
  symbol: string;
  ratio: number;
  txHistories?: Array<TxHistory>;
}
export interface TxHistory {
  to: string;
  from: string;
  value: string;
}
