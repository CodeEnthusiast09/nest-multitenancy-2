import { Module } from '@nestjs/common';
import { UsersModule } from './modules/tenant/users/users.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { publicTypeOrmAsyncConfig } from './modules/public/public-orm.config';
import { validate } from 'env.validation';
import { TenantController } from './modules/tenant/tenant.controller';
import { TenantService } from './modules/tenant/tenant.service';
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
    UsersModule,
    TenantModule,
    TenantModule,
  ],
  controllers: [TenantController],
  providers: [TenantService],
})
export class AppModule {}
