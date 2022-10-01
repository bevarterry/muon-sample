export interface Response {
  code: string;
  message: string;
  data: Array<VaultResponse>;
}

export interface VaultResponse {
  idx: string;
  id: string;
  name: string;
  MUP?: number;
  MU?: number;
  ETH: number;
  BNB: number;
  USDC: number;
  BTC: number;
}
