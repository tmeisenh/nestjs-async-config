import {
  Module,
  Global,
  DynamicModule,
  Provider,
  Logger,
} from '@nestjs/common';
import {
  ModuleConfigurationAsyncOptions,
  ModuleConfigurationOptions,
  ModuleConfigurationOptionsFactory,
} from './types';
import { DynamicConfigService } from './dynaimc-config.service';
import { DataFetcherService } from './data-fetcher.service';
import { CONFIGURATION_OPTIONS, DATA_PROVIDER } from './constants';
import {
  clientProvider,
  createOptionsProvider,
  fetchedDataProvider,
} from './providers';

@Global()
@Module({})
export class DynamicConfigModule {
  public static register(options: ModuleConfigurationOptions): DynamicModule {
    return {
      module: DynamicConfigModule,
      providers: [
        createOptionsProvider(options),
        fetchedDataProvider,
        clientProvider,
        DynamicConfigService,
        DataFetcherService,
        Logger,
      ],
      exports: [DynamicConfigService, DATA_PROVIDER],
    };
  }

  public static registerAsync(
    options: ModuleConfigurationAsyncOptions,
  ): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: DynamicConfigModule,
      imports: options.imports || [],
      providers,
      exports: [DynamicConfigService, DATA_PROVIDER],
    };
  }

  private static createAsyncProviders(
    options: ModuleConfigurationAsyncOptions,
  ): Provider[] {
    const optionsProvider = this.createAsyncOptionsProvider(options);
    return [
      optionsProvider,
      fetchedDataProvider,
      clientProvider,
      DynamicConfigService,
      DataFetcherService,
      Logger,
    ];
  }

  private static createAsyncOptionsProvider(
    options: ModuleConfigurationAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: CONFIGURATION_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: CONFIGURATION_OPTIONS,
      useFactory: async (optionsFactory: ModuleConfigurationOptionsFactory) => {
        return optionsFactory.createOptions();
      },
      inject: [],
    };
  }
}
