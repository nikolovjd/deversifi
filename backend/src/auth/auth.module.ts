import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EthSignatureStrategy } from './strategies/eth-signature.strategy';
import { PassportModule } from '@nestjs/passport';
import { DataModule } from '../data/data.module';

@Global()
@Module({
  providers: [AuthService, EthSignatureStrategy],
  imports: [PassportModule.register({ defaultStrategy: 'bearer' }), DataModule],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
