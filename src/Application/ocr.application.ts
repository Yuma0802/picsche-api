import { Injectable } from '@nestjs/common'
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { AppConfigService } from '../config/config.service';

@Injectable()
class OcrApplication{
  private visionClient: ImageAnnotatorClient;

  constructor(private readonly appConfigService: AppConfigService) {
    if(process.env.ENV === 'prod'){
      const serviceAccountKey = JSON.parse(process.env.SERVICE_ACCOUNT_KEY_JSON);
      this.visionClient = new ImageAnnotatorClient({
        credentials: serviceAccountKey,
      });
    }else{
      const serviceAccountKeyPath = appConfigService.serviceAccountKeyPath;
      this.visionClient = new ImageAnnotatorClient({
        keyFilename: serviceAccountKeyPath,
      });

    }
  }

  async oneImageOcrApplication(imageData){
    const request = {
      image: {
        content: imageData,
      },
      imageContext: {
        languageHints: ['ja'],
      },
    };

    const [result] = await this.visionClient.textDetection(request);
    const detections = result.textAnnotations;
    const description = detections?.[0].description;
    return description ?? undefined;
  }


}

export { OcrApplication }