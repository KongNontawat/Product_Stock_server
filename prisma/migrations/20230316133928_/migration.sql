-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeId` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `catId` INTEGER NOT NULL,
    `sku` VARCHAR(20) NOT NULL,
    `name` VARCHAR(250) NOT NULL,
    `price` DECIMAL(16, 2) NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_catId_fkey` FOREIGN KEY (`catId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
