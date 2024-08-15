import { Injectable, Inject, Logger } from '@nestjs/common';
import { CLIENT } from './constants';
import { Data } from './types';
import { FakeClient } from './fake-client';

/**
 * This uses the configured client (from the provider) and fetches
 * the secrets configured in the input option's paths.
 */
@Injectable()
export class DataFetcherService {
  public constructor(
    @Inject(CLIENT)
    private readonly client: FakeClient,
    private readonly logger: Logger,
  ) {}

  public async getThing(path: string): Promise<Data> {
    const value = await this.client.fetch(path);
    return { key: path, value: value };
  }
}
