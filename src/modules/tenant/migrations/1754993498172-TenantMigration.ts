import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class TenantMigration1754993498172 implements MigrationInterface {
  name = 'TenantMigration1754993498172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.query(
      `CREATE TABLE "${schema ?? 'public'}"."cat" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.query(`DROP TABLE "${schema ?? 'public'}"."cat"`);
  }
}
