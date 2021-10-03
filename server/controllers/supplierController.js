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

        connection.query('SELECT * FROM solidbuilders.purchaseorderitems WHERE purchOID = ?',[req.params.orderID], (err,rows) =>{
            
            connection.release();

            if(!err){ 
                res.render('SupplierViewPurchaseItems', {rows,pid:req.params.orderID});
            }else{
                console.log(err);
            }

        });
       
    });

}

exports.ViewInsertQuotationPage = (req, res) => {

    let num = 1;
    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM solidbuilders.purchaseorderitems WHERE purchOID = ?',[req.params.pid], (err,rows) =>{
            
            connection.release();

            if(!err){ 
                res.render('supplierQuotationInsert', {rows,q_pid:req.params.pid,num:num});
            }else{
                console.log(err);
            }

        });
       
    });
    
}

//Insert quotation details 
exports.createquotation = (req, res) => {

    let status = "Pending";
    
    const array=
    {
        qty : qty,
        price: price,
        itemName:itemName
    }
     = req.body;
    

    const{quotaionDate,orderID,supplierID} = req.body;

    //connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        connection.query('INSERT INTO solidbuilders.quotation SET supplierID = ?, orderID = ?, status = ?, quotaionDate = ?',[supplierID,orderID,status,quotaionDate], (err,result,rows) =>{
            
            
            let quotID = result.insertId;

            if(!err){ 
                
                for (let i = 0; i < itemName.length; i++) {
                    
                    connection.query('INSERT INTO solidbuilders.quotaiondetail SET qID = ?, itemName = ?, quantity = ?, price = ?',[quotID,itemName[i],qty[i],price[i]], (err,result,rows) =>{
            
                        if(!err){ 
                            
                        }else{
                            console.log(err);
                            
                        }
            
                    });
                   
                }
                connection.release();
                res.redirect('/');
               
            }else{
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

        connection.query('SELECT * FROM solidbuilders.supplier WHERE username = ? AND password = ?',[supUsername,supPassword], (err,rowSup) =>{
            
            connection.release();

            if(!err){ 
                res.render('staffDashboard', {rowSup});
            }else{
                console.log(err);
            }

        });
       
    });

}