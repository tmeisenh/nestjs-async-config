# nestjs-async-config

This project demonstrates how to build a nestjs configuration module that fetches configuration data asynchronously. This could be pulling data from a REST endpoint, from AWS using the aws-sdk, a database, or anything.

The nestjs documentation isn't that great and they don't really cover how to do something as common as this.

This is a contrived example but it shows how to wire up this `DynamicConfigModule` and allow it to pull a setting from the nestjs `ConfigService`. This module makes available a service `DynamicConfigService` that has a similiar API to `ConfigService` for retrieving what it fetched based on the key (the value of `thing`).

```ts
    DynamicConfigModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const timeout = parseInt(config.getOrThrow('sample.timeout'), 10);
        return {
          clientConfig: {
            timeout,
          },
          thing: 'some-config',
        };
      },
    }),

```

How this all works can be a bit confusing because it's a lot of little pieces that do one thing and return a singleton that something else references. The flow of execution is managed by nestjs's dependency injection rather than explicit method calls which makes it hard to visualize and confusing.
