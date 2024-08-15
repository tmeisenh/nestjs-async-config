import { Injectable, Inject } from '@nestjs/common';
import { DATA_PROVIDER } from './constants';
import { Data } from './types';

type Maybe<T> = T | null;
type Sorta<T> = T | undefined;

/**
 * This class simply provides an API around accessing the stored data.
 */
@Injectable()
export class DynamicConfigService {
  public constructor(
    @Inject(DATA_PROVIDER)
    private readonly data: Data[],
  ) {}

  public get<R extends string>(
    name: string,
    defaultValue: Maybe<R> = null,
  ): Maybe<R> {
    const found = this.lookup(name);
    if (!found) {
      return defaultValue;
    }

    return found.value as R;
  }

  private lookup(name: string): Sorta<Data> {
    console.log('hi: ', this.data);
    const found = this.data.find((param) => param.key.endsWith(name));
    return found;
  }

  public getOrThrow<R extends string>(name: string): R {
    const thing = this.lookup(name);
    if (!thing) {
      throw new Error(`Unable to find value for key: ${name}`);
    }
    return thing.value as R;
  }

  public getAll<R extends string>(): Maybe<R>[] {
    const all = this.data.map((x) => x.value);
    return all as R[];
  }
}
