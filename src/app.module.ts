import { Module } from '@nestjs/common';
import { TenantModule } from './modules/tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { publicTypeOrmAsyncConfig } from './modules/public/public-orm.config';
import { validate } from 'env.validation';
import { TenantController } from './modules/tenant/tenant.controller';
import { TenantService } from './modules/tenant/tenant.service';
import { CatsModule } from './modules/tenant/cats/cats.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [configuration],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync(publicTypeOrmAsyncConfig),
    TenantModule,
    TenantModule,
    CatsModule,
  ],
  controllers: [TenantController],
  providers: [TenantService],
})
export class AppModule {}
