const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController'); 

router.get('/',mainController.riddirectMainPage);

router.get('/supplierpage',mainController.viewPurchasedOrder);

router.get('/reqManagement',mainController.viewRequisition);

router.get('/managementView',mainController.viewPOManagement);

router.get('/login', mainController.login);

router.get('/viewNCompletedDeliveries',mainController.viewNotCompletedDeliveries);

router.get('/addPayment', mainController.goToAddPaymentPage);

module.exports = router;