/*
  Warnings:

  - You are about to alter the column `titulo` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.
  - You are about to alter the column `post` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15000)` to `VarChar(191)`.
  - You are about to alter the column `fonte` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(400)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Posts` MODIFY `titulo` VARCHAR(300) NOT NULL,
    MODIFY `post` VARCHAR(15000) NOT NULL,
    MODIFY `fonte` VARCHAR(400) NOT NULL;
