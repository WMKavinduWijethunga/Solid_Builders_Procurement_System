--data insert into purchased order table
INSERT INTO `purchaseorder` (`orderID`, `orderDate`, `deliveryDate`, `status`, `siteManName`, `siteName`, `comment`) VALUES ('1', '2021-09-15', '2021-09-30', 'Active', 'Kasun Bandara', 'Kandy', 'Urgently needed');



ALTER TABLE `purchaseorder` ADD `approval` VARCHAR(20) NOT NULL AFTER `comment`;

ALTER TABLE `purchaseorder` ADD `total` DOUBLE NOT NULL AFTER `approval`;

"ALTER TABLE `purchaseorder` DROP `status`;"

ALTER TABLE `site` ADD `siteName` VARCHAR(50) NOT NULL AFTER `location`;

ALTER TABLE `purchaseorder` CHANGE `orderDate` `orderDate` VARCHAR(25) NOT NULL; 


//2021-09-30
ALTER TABLE `purchaseorder` CHANGE `deliveryDate` `deliveryDate` VARCHAR(25) NOT NULL; 

ALTER TABLE `deliverydetails` ADD `deliveryStatus` VARCHAR(30) NOT NULL AFTER `contactNo`; 

ALTER TABLE `deliverydetails` CHANGE `date` `date` VARCHAR(25) NOT NULL; 

ALTER TABLE `payment` CHANGE `amount` `amount` DOUBLE NOT NULL; 

ALTER TABLE `payment` ADD `date` VARCHAR(25) NOT NULL AFTER `type`; 