import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssetDailiesService } from './assets-dalies.service';

@Controller('assets/:symbol/dailies')
export class AssetsDailiesController {
  constructor(private assetsDailiesService: AssetDailiesService) {}

  @Get()
  findAll(@Param('symbol') symbol: string) {
    return this.assetsDailiesService.findAll(symbol);
  }

  @Post()
  create(
    @Param('symbol') symbol: string,
    @Body() dto: { date: string; price: number },
  ) {
    return this.assetsDailiesService.create({
      symbol,
      date: new Date(dto.date),
      price: dto.price,
    });
  }
}
