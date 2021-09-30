
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

//read supllier quotation details
router.get('/readQuoto',staffController.ViewSupAllQuoto);

//read supllier quotation item detals individually
router.get('/viewSupQutoItems/:qid',staffController.ViewSupQuotoItems);

//approve low budget quotation
router.post('/approvelowBu/:qid',staffController.approvelowBudQuotation);


module.exports = router; 