import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'ABCDEFG HIJKLMN OPQRSTU VWXWZ Happy Happy I am happy. I can sing my ABC!';
  }
}
