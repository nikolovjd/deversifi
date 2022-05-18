import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DataModule } from '../data/data.module';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [DataModule],
})
export class OrdersModule {}
