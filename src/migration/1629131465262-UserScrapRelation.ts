import { MigrationInterface, QueryRunner } from "typeorm";

export class UserScrapRelation1629131465262 implements MigrationInterface {
  name = "UserScrapRelation1629131465262";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `thread` (`id` varchar(36) NOT NULL, `text` varchar(255) NOT NULL, `parentThreadId` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `scrap_thread_relation` (`scrapId` varchar(255) NOT NULL, `threadId` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`scrapId`, `threadId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `user_scrap_relation` (`userId` varchar(255) NOT NULL, `scrapId` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`userId`, `scrapId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `scrap` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `scrap_thread_relation` ADD CONSTRAINT `FK_bb21707982b23559b49a3522cea` FOREIGN KEY (`scrapId`) REFERENCES `scrap`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `scrap_thread_relation` ADD CONSTRAINT `FK_65a73cb82cc4c4965aa7de630b8` FOREIGN KEY (`threadId`) REFERENCES `thread`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `user_scrap_relation` ADD CONSTRAINT `FK_d9e82a3831221933b7347b4833f` FOREIGN KEY (`scrapId`) REFERENCES `scrap`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user_scrap_relation` DROP FOREIGN KEY `FK_d9e82a3831221933b7347b4833f`"
    );
    await queryRunner.query(
      "ALTER TABLE `scrap_thread_relation` DROP FOREIGN KEY `FK_65a73cb82cc4c4965aa7de630b8`"
    );
    await queryRunner.query(
      "ALTER TABLE `scrap_thread_relation` DROP FOREIGN KEY `FK_bb21707982b23559b49a3522cea`"
    );
    await queryRunner.query("DROP TABLE `scrap`");
    await queryRunner.query("DROP TABLE `user_scrap_relation`");
    await queryRunner.query("DROP TABLE `scrap_thread_relation`");
    await queryRunner.query("DROP TABLE `thread`");
  }
}
