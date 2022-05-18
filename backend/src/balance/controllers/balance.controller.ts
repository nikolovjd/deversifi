import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Account } from '../../auth/account.decorator';
import { BalanceService } from '../balance.service';
import { DepositTokenDto } from '../dto/request/deposit-token.dto';

@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard())
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('/getBalances')
  async getBalances(@Account() account) {
    const address = account.address;
    return this.balanceService.getBalances(address);
  }

  @Post('/deposit')
  async depositToken(@Body() data: DepositTokenDto, @Account() account) {
    const address = account.address;
    this.balanceService.makeDeposit(address, data.token, data.amount);
  }
}
