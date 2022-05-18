import { Test, TestingModule } from '@nestjs/testing';
import { EthSignatureStrategy } from './eth-signature.strategy';
import { AuthModule } from '../auth.module';
import { UnauthorizedException } from '@nestjs/common';
import { DataModule } from '../../data/data.module';

describe('EthStragety', () => {
  let strategy: EthSignatureStrategy;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [EthSignatureStrategy],
      imports: [AuthModule, DataModule],
    }).compile();

    strategy = app.get<EthSignatureStrategy>(EthSignatureStrategy);
  });

  describe('ETH Strategy', () => {
    it('Throws Unauthorized for invalid signatures', async () => {
      try {
        await strategy.validate('invalidsignature ');
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
