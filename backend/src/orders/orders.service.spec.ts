import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { AuthModule } from '../auth/auth.module';
import { DataModule } from '../data/data.module';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
      imports: [AuthModule, DataModule],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
