import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { TOKEN } from '../../../types';

export class DepositTokenDto {
  @ApiProperty({ enum: TOKEN })
  @IsEnum(TOKEN)
  token: TOKEN;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
