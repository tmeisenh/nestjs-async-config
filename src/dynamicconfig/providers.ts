import { FactoryProvider, ValueProvider } from '@nestjs/common';
import { CLIENT, CONFIGURATION_OPTIONS, DATA_PROVIDER } from './constants';
import { Data, ModuleConfigurationOptions } from './types';
import { FakeClient } from './fake-client';
import { DataFetcherService } from './data-fetcher.service';

/**
 * This provides the client that fetches the data
 */
export const clientProvider: FactoryProvider<FakeClient> = {
  provide: CLIENT,
  useFactory: async (
    options: ModuleConfigurationOptions,
  ): Promise<FakeClient> => {
    return new FakeClient(options.clientConfig);
  },
  inject: [CONFIGURATION_OPTIONS],
};

/**
 * This is returns a Provider that connects the configOptions (input into the module) with the fetch
 * provided by the service and makes its output available via the symbol.
 */
export const fetchedDataProvider: FactoryProvider<Data[]> = {
  provide: DATA_PROVIDER,
  useFactory: async (
    configOptions: ModuleConfigurationOptions,
    service: DataFetcherService,
  ): Promise<Data[]> => {
    const data = await service.getThing(configOptions.thing);
    return [data];
  },
  inject: [CONFIGURATION_OPTIONS, DataFetcherService],
};

/**
 * This provider allows us to have a nest-js provider 'wrapped' around the options.
 * It's just sugary synax.
 * @param options
 * @returns
 */
export const createOptionsProvider = (
  options: ModuleConfigurationOptions,
): ValueProvider<ModuleConfigurationOptions> => {
  return {
    provide: CONFIGURATION_OPTIONS,
    useValue: options,
  };
};
