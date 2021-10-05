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

exports.ViewManagemenetItemPage = (req, res) => {

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

                                res.render('managementViewPOitems', { row1: row1, row2: row2, row3: row3, pid: req.params.orderID });

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

exports.updateManagementApproval = (req, res) => {

    let btnapprove = req.body.btntoManage;
    let orderID = req.body.orderID;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('UPDATE purchaseorder SET approval = ? where orderID = ?', [btnapprove, orderID], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('managementDashboard');

            } else {
                console.log(err);
            }

        });

    });

}

exports.viewApprovedPOrders = (req, res) => {


    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.purchaseorder WHERE approval = ? ', ["Approve"], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('managementViewApprovedOrders', { rows });
            } else {
                console.log(err);
            }


        });

    });

}

exports.viewMQuoatation = (req, res) => {

    // let orderID = req.body.orderID;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.purchaseorderitems WHERE purchOID = ?', [req.params.orderID], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('managementViewQuotationApproved', { rows });
            } else {
                console.log(err);
            }


        });

    });

}

//management login
exports.managementLoginValidation = (req, res) => {

    let stUsername = req.body.manUsername;
    let stPassword = req.body.manPassword;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.manager WHERE username = ? AND password = ?', [stUsername, stPassword], (err, rowManagement) => {

            connection.release();

            if (!err) {

                if (rowManagement.length > 0) {
                    res.render('managementDashboard', { rowManagement });
                } else {
                    res.render('managementLogin', { error: "Incorrect Username and/or Password!" });
                }

            } else {
                console.log(err);
            }

        });

    });

}

exports.viewApprovedQuotation = (req, res) => {


    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.quotation WHERE status = ? ', ["Approve"], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('managementViewApprovedQuotations', { rows });
            } else {
                console.log(err);
            }


        });

    });

}

exports.goToDeliveryPage = (req, res) => {

    res.render('managementAddDeliveryDetails', { qID: req.params.qID, supplierID: req.params.supplierID });

}

//add delivery
exports.addDelivery = (req, res) => {

    let qid = req.body.qid;
    let sid = req.body.sid;
    let location = req.body.location;
    let number = req.body.number;
    let date = req.body.date;

    //connect to DB
    pool.getConnection((err, connection) => {

        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('INSERT INTO deliverydetails SET qID = ?, supId = ?, location	= ?, contactNo = ?, date = ?, deliveryStatus = ?', [qid, sid, location, number, date, status], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('managementDashboard');
            } else {
                console.log(err);
            }

        });

    });

         if (err) throw err; // not connected
         console.log('Connected as ID' + connection.threadId);

         connection.query('INSERT INTO deliverydetails SET qID = ?, supId = ?, location	= ?, contactNo = ?, date = ?, deliveryStatus = ?',[qid,sid,location,number,date,"Pending"], (err,rows) =>{
            
             connection.release();

             if(!err){ 
                 res.render('webHome');
             }else{
                 console.log(err);
             }

         });
       
     }); 


}