import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Account } from '../auth/account.decorator';
import { PlaceOrderDto } from './dto/place-order.dto';

@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/placeOrder')
  async placeOrder(@Body() data: PlaceOrderDto, @Account() account) {
    const { address } = account;
    const order = this.ordersService.placeOrder(address, data);

    return { id: order.id };
  }

  @Post('/cancelOrder/:id')
  async cancelOrder(@Account() account, @Param('id') id: string) {
    const { address } = account;
    const success = this.ordersService.cancelOrder(address, id);
    return { success };
  }

  @Get('/getOrders')
  async getOrders(@Account() account) {
    const { address } = account;
    const orders = this.ordersService.getOrders(address);
    return [...orders.buy, ...orders.sell];
  }
}
