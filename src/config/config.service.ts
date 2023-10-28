// config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get serviceAccountKeyPath(): string {
    return this.configService.get<string>('SERVICE_ACCOUNT_KEY_PATH');
  }
}
