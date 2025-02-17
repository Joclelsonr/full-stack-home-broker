import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { MongooseModule } from '@nestjs/mongoose';

const uri =
  'mongodb://root:root@localhost:27017/hbroker?authSource=admin&directConnection=true';

@Module({
  imports: [MongooseModule.forRoot(uri), AssetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
