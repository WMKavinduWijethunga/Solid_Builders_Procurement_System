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

exports.viewPurchasedOrder = (req, res) => {
    

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.purchaseorder', (err,rows) =>{
            
            connection.release();

            if(!err){ 
                res.render('supplierViewPurchasedOrder', {rows});
            }else{
                console.log(err);
            }

            
        });
       
    });

}

//view for mangement
exports.viewPOManagement = (req, res) => {
    

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.purchaseorder WHERE approval = ? ',["Management"], (err,rows) =>{
            
            connection.release();

            if(!err){ 
                res.render('managementPOView', {rows});
            }else{
                console.log(err);
            }

            
        });
       
    });

}


exports.riddirectMainPage = (req, res) => {
 
     res.render('webHome');
    
}
exports.riddirectSupplierPage = (req, res) => {
 
    res.render('supplierViewPurchasedOrder');
   
}

exports.viewRequisition = (req, res) => {
    

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.purchaseorder where approval =? or approval =? or approval =?' ,["Needed", "Approve", "Management"], (err,rows) =>{
            
            connection.release();

            if(!err){ 
                res.render('requisitionManagementOrder', {rows});
            }else{
                console.log(err);
            }

            
        });
       
    });

}

exports.login = (req, res) => {
    

    res.render('SupplierViewPurchaseItems');

}