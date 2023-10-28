import { Injectable, Inject } from '@nestjs/common';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { AppConfigService } from './config/config.service';
import { OcrApplication } from './Application/ocr.application';

@Injectable()
export class AppService {
  private visionClient: ImageAnnotatorClient;

  constructor(
    private readonly appConfigService: AppConfigService,
    @Inject(OcrApplication)
    private readonly ocrApplication: OcrApplication,
  ) {
    const serviceAccountKeyPath = appConfigService.serviceAccountKeyPath;
    this.visionClient = new ImageAnnotatorClient({
      keyFilename: serviceAccountKeyPath,
    });
  }

  getHello(): string {
    return 'ABCDEFG HIJKLMN OPQRSTU VWXWZ Happy Happy I am happy. I can sing my ABC!';
  }

  async oneImageService(imageData) {
    try {
      const ocrResult =
        await this.ocrApplication.oneImageOcrApplication(imageData);
      console.log(ocrResult)
      return ocrResult;
    } catch (e) {
      return e;
    }
  }
}
