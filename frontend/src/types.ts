export enum TOKEN {
  ETH = 'ETH',
  USDT = 'USDT',
  DVF = 'DVF'
}

export enum ORDER_TYPE {
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface AuthData {
  wallet: string
  signature: string
}