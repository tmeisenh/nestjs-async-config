import { Injectable } from '@nestjs/common';
import { DynamicConfigService } from './dynamicconfig/dynaimc-config.service';

@Injectable()
export class AppService {
  constructor(private readonly config: DynamicConfigService) {}
  getHello(): string {
    return this.config.getOrThrow('some-config');
  }
}
