-- CreateTable
CREATE TABLE `Posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(300) NOT NULL,
    `post` VARCHAR(15000) NOT NULL,
    `fonte` VARCHAR(400) NOT NULL,
    `data` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
