/*
  Warnings:

  - You are about to drop the `heartbeat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `heartbeat` DROP FOREIGN KEY `heartbeat_ibfk_2`;

-- DropForeignKey
ALTER TABLE `heartbeat` DROP FOREIGN KEY `heartbeat_ibfk_1`;

-- DropTable
DROP TABLE `heartbeat`;

-- CreateTable
CREATE TABLE `presence` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `player_id` VARCHAR(191) NOT NULL,
    `instance_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `presence.player_id_instance_id_unique`(`player_id`, `instance_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `presence` ADD FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presence` ADD FOREIGN KEY (`instance_id`) REFERENCES `instances`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
