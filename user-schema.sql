--data insert into purchased order table
INSERT INTO `purchaseorder` (`orderID`, `orderDate`, `deliveryDate`, `status`, `siteManName`, `siteName`, `comment`) VALUES ('1', '2021-09-15', '2021-09-30', 'Active', 'Kasun Bandara', 'Kandy', 'Urgently needed');

ALTER TABLE `purchaseorder` ADD `approval` VARCHAR(20) NOT NULL AFTER `comment`;

ALTER TABLE `purchaseorder` ADD `total` DOUBLE NOT NULL AFTER `approval`;