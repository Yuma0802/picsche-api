import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('oneimage')
  @UseInterceptors(FileInterceptor('image'))
  async oneImage(@UploadedFile() file) {
    // ここで画像ファイルを処理するコードを実装
    return await this.appService.oneImageService(file.buffer.toString('base64'))
  }
}
