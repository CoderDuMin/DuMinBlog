const mysql  = require('mysql');  
 
let connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'dumin-blog' 
}); 
 
connection.connect();

module.exports = connection