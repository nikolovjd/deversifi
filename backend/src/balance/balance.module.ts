import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { DataModule } from '../data/data.module';
import { BalanceController } from './controllers/balance.controller';

@Module({
  providers: [BalanceService],
  controllers: [BalanceController],
  imports: [DataModule],
})
export class BalanceModule {}
