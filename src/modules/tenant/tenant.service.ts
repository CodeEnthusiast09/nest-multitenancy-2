import { Injectable, OnModuleInit } from '@nestjs/common';
import publicDatasource from '../public/public-orm.config';
import { DataSource } from 'typeorm';
import { Tenant } from './entities/tenants.entity';
import { migrateTenantsDatabase } from './scripts/migrate-tenants';

@Injectable()
export class TenantService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    // Ensure main DataSource is initialized once on module initialization
    if (!publicDatasource.isInitialized) {
      await publicDatasource.initialize();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  // schema-based isolation
  // async createTenant(name: string) {
  //   if (!this.dataSource.isInitialized) {
  //     await this.dataSource.initialize();
  //   }
  //   const schema = `tenant_${name}`;

  //   await dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);

  //   const tenant = new Tenant();

  //   tenant.name = name;

  //   await this.dataSource.manager.save(tenant);
  // }

  // database-based isolation

  async createTenant(name: string) {
    const dbName = `tenant_${name}`;

    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }

      await publicDatasource.query(`
        CREATE DATABASE "${dbName}"
        WITH ENCODING 'UTF8'
        LC_COLLATE 'en_US.UTF-8'
        LC_CTYPE 'en_US.UTF-8'
        TEMPLATE template0;
      `);
      await migrateTenantsDatabase(dbName);
      const tenant = new Tenant();
      tenant.name = name;
      await this.dataSource.manager.save(tenant);
    } catch (error) {
      console.error(`❌ Error during tenant creation:`, error);

      try {
        console.log(`⚠️ Rolling back: dropping database "${dbName}"...`);
        await publicDatasource.query(`DROP DATABASE IF EXISTS "${dbName}"`);
      } catch (dropErr) {
        console.error(`❌ Failed to drop database "${dbName}":`, dropErr);
      }

      throw error; // propagate the original error
    }
  }
}
