import { tenantConfig } from '../tenant-orm.config';
import { DataSource, DataSourceOptions } from 'typeorm';

// schema-based isolation
// async function migrateTenants() {
//   await dataSource.initialize();
//   const tenants = await dataSource.query(
//     'select schema_name as name from information_schema.schemata;',
//   );
//   for (const tenant of tenants) {
//     if (tenant.name.startsWith('tenant_')) {
//       const tenantDataSource = new DataSource({
//         ...dataSource.options,
//         schema: tenant.name,
//       } as DataSourceOptions);
//       await tenantDataSource.initialize();
//       await tenantDataSource.runMigrations();
//       await tenantDataSource.destroy();
//     }
//   }
//   await dataSource.destroy();
// }

// database-based isolation
export async function migrateTenantsDatabase(database: string) {
  // await dataSource.initialize();
  // const tenants = await dataSource.query(`
  //   SELECT datname AS name
  //   FROM pg_database
  //   WHERE datname LIKE 'tenant_%';`);

  // for (const tenant of tenants) {
  //   if (tenant.name.startsWith('tenant_')) {
  //     const tenantDataSource = new DataSource({
  //       ...dataSource.options,
  //       database: tenant.name,
  //     } as DataSourceOptions);
  //     await tenantDataSource.initialize();
  //     await tenantDataSource.runMigrations();
  //     await tenantDataSource.destroy();
  //   }
  // }
  // await dataSource.destroy();

   ...tenantConfig,
    database,
    name: `tenant-${database}`, // avoid connection name collision
  } as DataSourceOptions);

  try {
    await ds.initialize();
    await ds.runMigrations();
    console.log(`Migration completed for ${database}`);
  } catch (err) {
    console.error(`Migration failed for ${database}`, err);
    throw err;
  } finally {
    await ds.destroy();
  }
}const ds = new DataSource({
   

// migrateTenantsDatabase().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });
