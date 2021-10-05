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


//retrieve purchase order items details for management 
exports.ViewStaffItemPage = (req, res) => {

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        var sql1 = 'SELECT * FROM solidbuilders.purchaseorderitems WHERE purchOID = ?';
        var sql2 = 'SELECT * FROM solidbuilders.purchaseorder WHERE orderID = ?'
        var sql3 = 'SELECT budget FROM solidbuilders.site WHERE siteName = ?'

        connection.query(sql1, [req.params.orderID], (err, row1) => {

            if (!err) {

                connection.query(sql2, [req.params.orderID], (err, row2) => {

                    if (!err) {

                        stname = row2[0].siteName;

                        connection.query(sql3, [stname], (err, row3) => {
                            connection.release();

                            if (!err) {

                                res.render('viewReqItems', { row1: row1, row2: row2, row3: row3, pid: req.params.orderID });

                            } else {
                                console.log(err);
                            }

                        });

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

//retrieve purchase order items details 
exports.updateStaffApproval = (req, res) => {

    let btnapprove = req.body.btntostaff;
    let orderID = req.body.orderID;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('UPDATE purchaseorder SET approval = ? where orderID = ?', [btnapprove, orderID], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('requisitionManagementOrder');
            } else {
                console.log(err);
            }

        });

    });

}

//compare deliveries with porder
exports.compareView = (req, res) => {

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        var sql1 = 'SELECT * FROM solidbuilders.quotaiondetail WHERE qID = ?';
        var sql2 = 'SELECT * FROM solidbuilders.quotation WHERE qID = ?'
        var sql3 = 'SELECT * FROM solidbuilders.purchaseorderitems WHERE purchOID = ?'

        connection.query(sql1, [req.params.qID], (err, rowQuoatationItems) => {

            if (!err) {

                connection.query(sql2, [req.params.qID], (err, rowQuoatation) => {

                    if (!err) {

                        orderID = rowQuoatation[0].orderID;

                        connection.query(sql3, [orderID], (err, rowPOItems) => {
                            connection.release();

                            if (!err) {

                                res.render('staffCompareView', { rowQuoatationItems: rowQuoatationItems, rowQuoatation: rowQuoatation, rowPOItems: rowPOItems });

                            } else {
                                console.log(err);
                            }

                        });

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

//complete or decline the deliveries
exports.updateDeliveryStatus = (req, res) => {

    let btntoDeliverysts = req.body.btntoDeliverysts;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('UPDATE deliverydetails SET deliveryStatus = ? where qID = ?', [btntoDeliverysts, req.params.qID], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('webHome');
            } else {
                console.log(err);
            }

        });

    });

}

//add Payment
exports.addPaymentbyStaff = (req, res) => {

    let amount = req.body.amount;
    let type = req.body.type;
    let date = req.body.date;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('INSERT INTO payment SET amount = ?, type = ?, date = ?', [amount, type, date], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('webHome');
            } else {
                console.log(err);
            }

        });

    });

}

//read all supplier quotation
exports.ViewSupAllQuoto = (req, res) => {


    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.quotation', (err, rows) => {

            connection.release();

            if (!err) {
                res.render('staffViewSupQuotation', { rows });
            } else {
                console.log(err);
            }


        });

    });

}

//read supllier quotation item detals individually
exports.ViewSupQuotoItems = (req, res) => {

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.quotaiondetail WHERE qID = ?', [req.params.qid], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('ViewSupQutoDetails', { rows, qid: req.params.qid });
            } else {
                console.log(err);
            }

        });

    });

}

//approve low budget quotation
exports.approvelowBudQuotation = (req, res) => {


    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('UPDATE solidbuilders.quotation SET status = ? where qID = ?', ["Approve", req.params.qid], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('staffDashboard');
            } else {
                console.log(err);
            }

        });

    });

}

//staff login
exports.staffLoginValidation = (req, res) => {

    let stUsername = req.body.stUsername;
    let stPassword = req.body.stPassword;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.staff WHERE usename = ? AND password = ?', [stUsername, stPassword], (err, rowStaff) => {

            connection.release();

            if (!err) {
                if (rowStaff.length > 0) {
                    res.render('staffDashboard', { rowStaff });
                } else {
                    res.render('staffLogin', { error: "Incorrect Username and/or Password!" });
                }
            } else {
                console.log(err);
            }

        });

    });

}

//read supplier list
exports.ViewSupList = (req, res) => {


    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.supplier', (err, rows) => {

            connection.release();

            if (!err) {
                res.render('staffViewSupplier', { rows });
            } else {
                console.log(err);
            }


        });

    });

}