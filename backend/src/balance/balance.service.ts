import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { TOKEN } from '../types';

@Injectable()
export class BalanceService {
  constructor(private readonly dataService: DataService) {}

  public makeDeposit(address: string, token: TOKEN, amount: number) {
    this.dataService.addToBalance(address, token, amount);
  }

  public getBalances(address: string) {
    return this.dataService.getAccountBalance(address);
  }
}
