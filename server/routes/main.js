const express = require('express');
const router = express.Router();
const supController = require('../controllers/mainController'); 

router.get('/',supController.riddirectMainPage);

router.get('/supplierpage',supController.viewPurchasedOrder);

module.exports = router;