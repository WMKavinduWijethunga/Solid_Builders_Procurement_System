const express = require('express');
const router = express.Router();
const manageController = require('../controllers/managementController'); 

router.get('/manageItems/:orderID',manageController.ViewManagemenetItemPage);
router.post('/sendManageApproval',manageController.updateManagementApproval);
router.get('/viewApprovalManagement',manageController.viewApprovedPOrders);
router.get('/viewApprovedQuotationManagement',manageController.viewApprovedQuotation);

router.get('/managementViewQuoatationItems/:orderID',manageController.viewMQuoatation);
router.get('/managEnterDDetails/:qID/:supplierID',manageController.goToDeliveryPage);

router.post('/insertDelivery' , manageController.addDelivery);

//management login form
router.post('/managementLoginValidation' , manageController.managementLoginValidation);

module.exports = router;