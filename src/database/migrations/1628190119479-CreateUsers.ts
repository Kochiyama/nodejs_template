import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1628190119479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'UUID',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'TEXT',
          },
          {
            name: 'email',
            type: 'TEXT',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'TEXT',
          },
          {
            name: 'active',
            type: 'BOOLEAN',
            default: true,
          },
          {
            name: 'created_at',
            type: 'TIMESTAMPTZ',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'TIMESTAMPTZ',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('users');
  }
}
