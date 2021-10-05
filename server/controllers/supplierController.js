const { query } = require('express');
const mysql = require('mysql');

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3307

});


//retrieve purchase order items details 
exports.ViewSupPurchItemPage = (req, res) => {

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.purchaseorderitems WHERE purchOID = ?', [req.params.orderID], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('SupplierViewPurchaseItems', { rows, oid: req.params.orderID, supID: req.params.supID });
            } else {
                console.log(err);
            }

        });

    });

}

exports.ViewInsertQuotationPage = (req, res) => {

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.purchaseorderitems WHERE purchOID = ?', [req.params.oid], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('supplierQuotationInsert', { rows, q_pid: req.params.oid, supID: req.params.supID });
            } else {
                console.log(err);
            }

        });

    });

}

//Insert quotation details 
exports.createquotation = (req, res) => {

    let status = "Pending";

    const array =
        {
            qty: qty,
            price: price,
            itemName: itemName
        }
        = req.body;


    const { quotaionDate, orderID, supplierID } = req.body;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('INSERT INTO solidbuilders.quotation SET supplierID = ?, orderID = ?, status = ?, quotaionDate = ?', [supplierID, orderID, status, quotaionDate], (err, result, rows) => {


            let quotID = result.insertId;

            if (!err) {

                for (let i = 0; i < itemName.length; i++) {

                    connection.query('INSERT INTO solidbuilders.quotaiondetail SET qID = ?, itemName = ?, quantity = ?, price = ?', [quotID, itemName[i], qty[i], price[i]], (err, result, rows) => {

                        if (!err) {

                        } else {
                            console.log(err);

                        }

                    });

                }
                connection.query('SELECT * FROM solidbuilders.purchaseorder where approval =? ', ["Approve"], (err, rows) => {

                    connection.release();

                    if (!err) {

                        res.render('supplierViewPurchasedOrder', { rows, supID: req.params.supID });
                    } else {
                        console.log(err);
                    }


                });



            } else {
                console.log(err);

            }

        });

    });

}

//supplier login
exports.supLoginValidation = (req, res) => {

    let supUsername = req.body.supUsername;
    let supPassword = req.body.supPassword;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.supplier WHERE username = ? AND password = ?', [supUsername, supPassword], (err, rowSup) => {

            if (!err) {
                if (rowSup.length > 0) {

                    let supID = rowSup[0].supplierID;

                    connection.query('SELECT * FROM solidbuilders.purchaseorder where approval =? ', ["Approve"], (err, rows) => {

                        connection.release();

                        if (!err) {

                            for (let i = 0; i < rows.length; i++) {
                                rows[i].supID = supID;
                            }

                            console.log(rows);

                            res.render('supplierViewPurchasedOrder', { rows, supID: supID });
                        } else {
                            console.log(err);
                        }


                    });

                } else {
                    res.render('supplierLogin', { error: "Incorrect Username and/or Password!" });
                }

            } else {
                console.log(err);
            }

        });

    });

}

//View Relevent supliier Order
exports.ViewSupplierAprrovedOrder = (req, res) => {

    let supID = req.params.supID
    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.quotation WHERE supplierID = ? And status =?', [supID, "Approve"], (err, rows) => {

            connection.release();

            if (!err) {
                for (let i = 0; i < rows.length; i++) {
                    rows[i].supID = supID;
                }

                res.render('supplierViewApprovedQuoto', { rows, supID: supID });
            } else {
                console.log(err);
            }

        });

    });

}

//View Relevent supliier approved Order Items detail
exports.ViewSupplierAprrovedOrderItems = (req, res) => {

    let supID = req.params.supID;
    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.quotaiondetail WHERE qID = ?', [req.params.qID], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('supApprovedQutoDetails', { rows, qID: req.params.qID, supID: supID });
            } else {
                console.log(err);
            }

        });

    });

}




//View Relevent supliier approved Order delivery detail
exports.viewApprovedQuotoDeleivery = (req, res) => {

    let supID = req.params.supID;
    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.deliverydetails WHERE qID = ?', [req.params.qID], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('supplierViewApprDelivery', { rows, qID: req.params.qID, supID: supID });
            } else {
                console.log(err);
            }

        });

    });

}