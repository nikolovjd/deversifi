import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { DataModule } from '../data/data.module';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceService],
      imports: [DataModule],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
