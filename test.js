 //"type": "module",
 var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sellercenter.cuecqchkbrc2.us-east-1.rds.amazonaws.com',
  port      :  3307,
  user     : 'admin',
  password : 'InAmberClad117',
  database : 'sellercenter'

});
var app = express();

connection.connect(function(err){

if(!err) {
    console.log("Database is connected ... ");
    var sql = "INSERT INTO rol (name) VALUES ('Company Inc')";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });    
} else {
    console.log("Error connecting database ... ");    
}
});