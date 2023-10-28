import { Injectable, Inject } from '@nestjs/common';
import { OcrApplication } from './Application/ocr.application';
import { GptApplication } from './Application/gpt.application';

@Injectable()
export class AppService {

  constructor(
    @Inject(OcrApplication)
    private readonly ocrApplication: OcrApplication,
    @Inject(GptApplication)
    private readonly gptApplication: GptApplication
  ) {}

  getHello(): string {
    return 'ABCDEFG HIJKLMN OPQRSTU VWXWZ Happy Happy I am happy. I can sing my ABC!';
  }

  async oneImageService(imageData) {
    try {
      const ocrResult =
        await this.ocrApplication.oneImageOcrApplication(imageData);
      const result = await this.gptApplication.extractInfo(ocrResult)
      return result;
    } catch (e) {
      return e;
    }
  }
}
