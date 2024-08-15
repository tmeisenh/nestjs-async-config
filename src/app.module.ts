import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamicConfigModule } from './dynamicconfig/dynamicconfig.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sample } from './sample';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      load: [sample],
    }),
    DynamicConfigModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const timeout = parseInt(config.getOrThrow('sample.timeout'), 10);
        console.log('timeout: ', timeout);
        return {
          clientConfig: {
            timeout,
          },
          thing: 'some-config',
        };
      },
    }),
    // DynamicConfigModule.register({
    //   thing: 'some-config',
    //   clientConfig: { timeout: 3 },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
