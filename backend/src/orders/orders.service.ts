import { Injectable, Logger } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { PlaceOrderDto } from './dto/place-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly dataService: DataService) {}

  private readonly logger = new Logger(OrdersService.name);

  public getOrders(address: string) {
    const account = this.dataService.getAccount(address);
    return account.orders;
  }

  public placeOrder(address: string, data: PlaceOrderDto) {
    try {
      const order = this.dataService.createOrder(address, data);
      this.logger.log(
        `PLACED ${order.type} ${order.token} @ ${order.price}USD ${order.amount}`,
      );
      return order;
    } catch (err) {
      throw err;
    }
  }

  public cancelOrder(address: string, id: string) {
    const cancelledOrder = this.dataService.cancelOrder(address, id);
    this.logger.log(
      `CANCELLED ${cancelledOrder.type} ${cancelledOrder.token} @ ${cancelledOrder.price}USD ${cancelledOrder.amount}`,
    );

    return true;
  }
}
