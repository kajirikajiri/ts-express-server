import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUser1629042207939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("user");
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_: QueryRunner): Promise<void> {}
}
