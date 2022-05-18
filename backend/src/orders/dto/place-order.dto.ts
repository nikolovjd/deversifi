import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { ORDER_TYPE, TOKEN } from '../../types';

export class PlaceOrderDto {
  @ApiProperty({ enum: ORDER_TYPE })
  @IsEnum(ORDER_TYPE)
  type: ORDER_TYPE;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ enum: TOKEN })
  @IsEnum(TOKEN)
  token: TOKEN;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;
}
