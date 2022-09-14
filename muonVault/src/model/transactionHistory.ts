export interface TransactionHistories {
  histories: Array<TxHistory>;
}
export interface TxHistory {
  from: string;
  to: string;
  purpose: string;
  value: number;
  txid?: string;
}
