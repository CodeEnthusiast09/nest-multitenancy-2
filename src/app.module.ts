import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantModule } from './modules/tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { publicTypeOrmAsyncConfig } from './modules/public/public-orm.config';
import { validate } from 'env.validation';
import { TenantController } from './modules/tenant/tenant.controller';
import { TenantService } from './modules/tenant/tenant.service';
import { CatsModule } from './modules/tenant/cats/cats.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import configuration from './config/configuration';
import { TenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { UsersModule } from './modules/tenant/users/users.module';
import { AuthModule } from './modules/tenant/auth/auth.module';

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
    TenancyModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [TenantController],
  providers: [TenantService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenancyMiddleware).forRoutes('*');
  }
}
