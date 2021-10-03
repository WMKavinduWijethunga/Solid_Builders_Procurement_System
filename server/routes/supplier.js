const express = require('express');
const router = express.Router();
const supController = require('../controllers/supplierController'); 

//Controller Method
//router.get('/',supController.viewPurchasedOrder);

//redirect to suplier item page
router.get('/sup_view_p_items/:orderID',supController.ViewSupPurchItemPage);


//redirect to suplier quotation insert page
router.get('/insertQuotation/:pid',supController.ViewInsertQuotationPage);

router.post('/insertQuotation',supController.createquotation);

//supplier login
router.post('/supLoginValidation' ,supController.supLoginValidation);


module.exports = router;

