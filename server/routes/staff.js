
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController'); 

router.get('/StaffviewReqItems/:orderID',staffController.ViewStaffItemPage);

//sending approval 
router.post('/approval',staffController.updateStaffApproval);

router.get('/compareOrder/:qID',staffController.compareView);

router.post('/completeDelivery/:qID',staffController.updateDeliveryStatus);

//router.post('/insertPayment', staffController.addPaymentbyStaff);

router.post('/insertPayment' , staffController.addPaymentbyStaff);

module.exports = router; 