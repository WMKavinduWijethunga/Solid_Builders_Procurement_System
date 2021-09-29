const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//parssing midlwares
//parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//static files
app.use(express.static('public'));

//Templating Engine
app.engine('hbs',exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs'); 

//connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME,
    port            : 3307

});

//connect to DB
pool.getConnection((err, connection) =>{
    if(err) throw err; // not connected
    console.log('Connected as ID' + connection.threadId);
});
app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/supplier'));
app.use('/',require('./server/routes/staff'));


app.listen(port,() => console.log(`Listening on port ${port}`));

