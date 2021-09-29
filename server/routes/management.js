const express = require('express');
const router = express.Router();
const manageController = require('../controllers/managementController'); 

router.get('/manageItems/:orderID',manageController.ViewManagemenetItemPage);
router.post('/sendManageApproval',manageController.updateManagementApproval);
router.get('/viewApprovalManagement',manageController.viewApprovedPOrders);
router.get('/managementViewQuoatationItems/:qID',manageController.viewMQuoatation);

module.exports = router;