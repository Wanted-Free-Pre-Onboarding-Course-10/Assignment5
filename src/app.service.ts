import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getTest(): string {
    return 'hello test';
  }
  getTest2(): string {
    return 'hello test';
  }
}
