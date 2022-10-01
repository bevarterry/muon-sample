export interface Response {
  code: string;
  message: string;
  data: UserApiResponse;
}

export interface UserApiResponse {
  username: string;
  contact: string;
  MUP: string;
  SafeAddress: SafeAddressSet;
  Wallet: WalletSet;
}

export interface SafeAddressSet {
  ETH: string;
  BNB: string;
  USDC: string;
  BTC: string;
}

export interface WalletSet {
  ETH: KetSet;
  BNB: KetSet;
  USDC: KetSet;
  BTC: KetSet;
}

export interface KetSet {
  PRIVATE: string;
  PUBLIC: string;
}
