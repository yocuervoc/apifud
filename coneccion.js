var mysql = require('mysql');
https = require('https');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'users',
//     port: 3306
//  });
 var connection = mysql.createConnection({
   host: 'dev-superfuds.cm8heorrngqo.sa-east-1.rds.amazonaws.com',
   user: 'testuser',
   password: '$up3rFud$',
   database: 'test',
   port: 3306
 });
// connection.connect(function(error){
//    if(error){
//       throw error;
//    }else{
//       console.log('Conexion correcta.');
//    }
// });
// warehouse
// warehouse_description
var query = connection.query('desc warehouse_description;', function (error, result){
    if(error){
       throw error;
    }else{
       console.log(result);
    }
  }
 );
connection.end();