import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { uuid } from 'uuidv4';
import Account, { Order } from '../Account';
import { ORDER_TYPE, TOKEN } from '../types';
import { PlaceOrderDto } from '../orders/dto/place-order.dto';

@Injectable()
export class DataService {
  private accounts = new Map();

  public getAccount(address: string) {
    return DataService.deepCopy(this.get(address));
  }

  public getAccountBalance(address: string) {
    const account = this.get(address);
    return DataService.deepCopy(account.balance);
  }

  public addToBalance(address: string, token: TOKEN, amount: number) {
    const account = this.get(address);
    account.balance[token] += amount;
  }

  public createOrder(address: string, data: PlaceOrderDto) {
    const account = this.get(address);
    // Check if account has enough tokens
    if (data.type === ORDER_TYPE.SELL) {
      const accountOwned = account.balance[data.token];
      if (data.amount > accountOwned) {
        throw new NotAcceptableException('Insufficient Funds');
      }
      // Account has enough balance to create order
      const balanceSnapshot = DataService.getBalanceSnapshot(account);
      try {
        account.balance[data.token] -= data.amount;
        const order = new Order(data, uuid());
        account.orders.sell.push(order);
        return order;
      } catch (err) {
        account.balance = balanceSnapshot;
        throw err;
      }
    } else {
      const order = new Order(data, uuid());
      account.orders.buy.push(order);
      return order;
    }
  }

  public cancelOrder(address: string, id: string) {
    const account = this.get(address);
    const buyIndex = account.orders.buy.findIndex((order) => order.id === id);
    const sellIndex = account.orders.sell.findIndex((order) => order.id === id);

    let cancelledOrder;

    if (!(buyIndex >= 0 || sellIndex >= 0)) {
      throw new NotFoundException();
    }

    if (buyIndex >= 0) {
      cancelledOrder = DataService.deepCopy(account.orders.buy[buyIndex]);
      account.orders.buy.splice(buyIndex, 1);
    }

    if (sellIndex >= 0) {
      cancelledOrder = DataService.deepCopy(account.orders.sell[sellIndex]);
      account.orders.sell.splice(sellIndex, 1);
      account.balance[cancelledOrder.token] += cancelledOrder.amount;
    }

    return cancelledOrder;
  }

  private createAccount(address: string) {
    if (this.accounts.has(address)) {
      throw new Error('Trying to create account that already exists!');
    }
    const account = new Account(address);
    this.accounts.set(address, account);
    return account;
  }

  private get(address: string): Account {
    if (!this.accounts.has(address)) {
      return this.createAccount(address);
    }

    return this.accounts.get(address);
  }

  private static getBalanceSnapshot(account: Account) {
    return this.deepCopy(account.balance);
  }

  private static deepCopy(data: any) {
    return JSON.parse(JSON.stringify(data));
  }
}
