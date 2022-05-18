import { TOKEN } from './types';
import { PlaceOrderDto } from './orders/dto/place-order.dto';

export default class Account {
  public address: string;
  public orders: Orders;
  public balance: Balance;

  constructor(address: string) {
    this.address = address;
    this.orders = new Orders();
    this.balance = new Balance();
  }
}

export class Orders {
  public buy: Order[] = [];
  public sell: Order[] = [];
}

export class Order {
  public id: string;
  public type: 'SELL' | 'BUY';
  public token: TOKEN;
  public amount: number;
  public price: number;

  constructor(data: PlaceOrderDto, id: string) {
    this.id = id;
    this.type = data.type;
    this.token = data.token;
    this.amount = data.amount;
    this.price = data.price;
  }
}

export class Balance {
  public [TOKEN.ETH] = 0;
  public [TOKEN.DVF] = 0;
  public [TOKEN.USDT] = 0;
}
