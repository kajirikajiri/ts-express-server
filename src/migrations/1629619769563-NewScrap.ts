import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewScrap1629619769563 implements MigrationInterface {
  name = 'NewScrap1629619769563';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`test\`.\`thread\` (\`id\` char(36) NOT NULL, \`text\` varchar(255) NOT NULL, \`parentThreadId\` char(36) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`test\`.\`user_scrap_relation\` (\`userId\` varchar(255) NOT NULL, \`scrapId\` char(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`userId\`, \`scrapId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`test\`.\`scrap\` (\`id\` char(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`test\`.\`scrap_threads_relation\` (\`scrap\` char(36) NOT NULL, \`thread\` char(36) NOT NULL, INDEX \`IDX_5dd600f60c047df396cfd5fa4e\` (\`scrap\`), INDEX \`IDX_e3604ec56c55d8759e5bd79853\` (\`thread\`), PRIMARY KEY (\`scrap\`, \`thread\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`test\`.\`user_scrap_relation\` ADD CONSTRAINT \`FK_d9e82a3831221933b7347b4833f\` FOREIGN KEY (\`scrapId\`) REFERENCES \`test\`.\`scrap\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`test\`.\`scrap_threads_relation\` ADD CONSTRAINT \`FK_5dd600f60c047df396cfd5fa4ea\` FOREIGN KEY (\`scrap\`) REFERENCES \`test\`.\`scrap\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`test\`.\`scrap_threads_relation\` ADD CONSTRAINT \`FK_e3604ec56c55d8759e5bd798531\` FOREIGN KEY (\`thread\`) REFERENCES \`test\`.\`thread\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`test\`.\`scrap_threads_relation\` DROP FOREIGN KEY \`FK_e3604ec56c55d8759e5bd798531\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`test\`.\`scrap_threads_relation\` DROP FOREIGN KEY \`FK_5dd600f60c047df396cfd5fa4ea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`test\`.\`user_scrap_relation\` DROP FOREIGN KEY \`FK_d9e82a3831221933b7347b4833f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e3604ec56c55d8759e5bd79853\` ON \`test\`.\`scrap_threads_relation\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5dd600f60c047df396cfd5fa4e\` ON \`test\`.\`scrap_threads_relation\``,
    );
    await queryRunner.query(`DROP TABLE \`test\`.\`scrap_threads_relation\``);
    await queryRunner.query(`DROP TABLE \`test\`.\`scrap\``);
    await queryRunner.query(`DROP TABLE \`test\`.\`user_scrap_relation\``);
    await queryRunner.query(`DROP TABLE \`test\`.\`thread\``);
  }
}
