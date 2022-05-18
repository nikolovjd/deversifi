import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { BalanceModule } from './balance/balance.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthModule, DataModule, BalanceModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
