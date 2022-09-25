export interface WalletSet {
  ETH: Wallet;
  BNB: Wallet;
  USDC: Wallet;
  BTC: Wallet;
}

export interface Wallet {
  privateKey: string;
  address: string;
}
