import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

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
    const result = await this.appService.oneImageService(file.buffer.toString('base64'))
    return result;
  }

  @Post('multipleimages')
  @UseInterceptors(FilesInterceptor('images', 5)) // 5つまでのファイルを受け取る
  async multipleImages(@UploadedFiles() files) {
    // ここで画像ファイルを処理するコードを実装
    const results = await Promise.all(
      files.map(async (file) => {
        return this.appService.oneImageService(file.buffer.toString('base64'));
      }),
    );
    console.log(results);
    return results;
  }
}
