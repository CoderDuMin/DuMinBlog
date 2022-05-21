const mysql  = require('mysql');  
 
let db = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'dumin-blog' 
}); 
 
db.connect();

module.exports = db