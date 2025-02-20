import { Module } from '@nestjs/common';
import { AssetsGateway } from './assets.gateway';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './entities/asset.entity';
import { AssetDaily, AssetDailySchema } from './entities/asset-daily.entity';
import { AssetsDailiesController } from './assets-dailies.controller';
import { AssetDailiesService } from './assets-dalies.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetSchema,
      },
      {
        name: AssetDaily.name,
        schema: AssetDailySchema,
      },
    ]),
  ],
  controllers: [AssetsController, AssetsDailiesController],
  providers: [AssetsService, AssetsGateway, AssetDailiesService],
})
export class AssetsModule {}
