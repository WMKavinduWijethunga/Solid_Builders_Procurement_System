const express = require('express');
const router = express.Router();
const supController = require('../controllers/supplierController');

//Controller Method
//router.get('/',supController.viewPurchasedOrder);

//redirect to suplier item page
router.get('/sup_view_p_items/:orderID/:supID', supController.ViewSupPurchItemPage);


//redirect to suplier quotation insert page
router.get('/getinsertQuotation/:oid/:supID', supController.ViewInsertQuotationPage);

router.post('/insertQuotation', supController.createquotation);

//supplier login
router.post('/supLoginValidation', supController.supLoginValidation);

//View Relevent supliier approved Order
router.get('/supviewapprove/:supID', supController.ViewSupplierAprrovedOrder);


module.exports = router;

