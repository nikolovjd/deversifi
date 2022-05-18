import { Strategy } from 'passport-http-bearer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ecrecover,
  pubToAddress,
  fromRpcSig,
  keccak,
  isValidAddress,
} from 'ethereumjs-util';
import { DataService } from '../../data/data.service';

@Injectable()
export class EthSignatureStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly dataService: DataService) {
    super();
  }

  async validate(signature: string) {
    try {
      const authMessage = 'auth';
      const sig = fromRpcSig(signature);

      const hash = keccak(
        Buffer.from(
          '\x19Ethereum Signed Message:\n' + authMessage.length + authMessage,
        ),
      );

      const publicKey = ecrecover(hash, sig.v, sig.r, sig.s);
      const address = pubToAddress(publicKey).toString('hex');

      if (!isValidAddress('0x' + address)) {
        throw new UnauthorizedException();
      }

      return this.dataService.getAccount(address);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
