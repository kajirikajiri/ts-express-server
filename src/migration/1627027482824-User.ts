import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1627027482824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.createTable(new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int'
          }
        ]
      }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropTable('user')
    }

}
