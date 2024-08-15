import { ModuleMetadata } from '@nestjs/common/interfaces';
import { FakeClientConfig } from './fake-client';

/**
 * This is what useFactory in the register methods returns
 * This is the configuration that the module needs to do its work.
 */
export interface ModuleConfigurationOptions {
  thing: string;
  clientConfig: FakeClientConfig;
}

/**
 * This type defines what our data looks like
 */
export interface Data {
  key: string;
  value: string;
}

/**
 * This defines the contract for the registerAsync function.
 */
export interface ModuleConfigurationAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory?: (
    ...args: any[]
  ) => Promise<ModuleConfigurationOptions> | ModuleConfigurationOptions;
}

export interface ModuleConfigurationOptionsFactory {
  createOptions():
    | Promise<ModuleConfigurationOptions>
    | ModuleConfigurationOptions;
}
