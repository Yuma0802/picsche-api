import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { OcrApplication } from './Application/ocr.application';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppConfigService, AppService, OcrApplication],
})
export class AppModule {}
