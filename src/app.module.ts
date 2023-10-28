import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { OcrApplication } from './Application/ocr.application';
import { GptApplication } from './Application/gpt.application';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppConfigService, AppService, OcrApplication, GptApplication],
})
export class AppModule {}
