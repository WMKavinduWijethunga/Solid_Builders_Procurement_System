const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController'); 

router.get('/',mainController.riddirectMainPage);

router.get('/supplierpage',mainController.viewPurchasedOrder);

router.get('/reqManagement',mainController.viewRequisition);

router.get('/managementView',mainController.viewPOManagement);

router.get('/loginCompanySide', mainController.loginCompanySide);

router.get('/viewNCompletedDeliveries',mainController.viewNotCompletedDeliveries);

router.get('/addPayment', mainController.goToAddPaymentPage);

//staff login form
router.get('/loginStaff' , mainController.staffLoginView);

//management login form
router.get('/loginManagement' , mainController.managementLoginView);

module.exports = router;