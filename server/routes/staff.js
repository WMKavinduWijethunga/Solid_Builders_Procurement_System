
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController'); 

router.get('/StaffviewReqItems/:orderID',staffController.ViewStaffItemPage);

//sending approval 
router.post('/approval',staffController.updateStaffApproval);


module.exports = router; 