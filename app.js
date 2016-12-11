var express = require('express')
var app = express()
var moment = require('moment');


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
var mysql = require("mysql");
app.use(express.static('angularjs'))
app.get('/list', function (req, res) {
   var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
   database: "dataphi"
  });

  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
    con.query('SELECT * FROM patients order by 1 desc',function(err,rows){
    console.log('Data received from Db:\n');
    console.log(rows);
      res.send(rows);
    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });
  });
  });
});
app.post('/submit', function (req, res) {
   var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
   database: "dataphi"
  });

  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
    con.query('SELECT * FROM patients where email like "'+req.body.email+'"',function(err,rows){
      //if(err) throw err;
      console.log(err);
      console.log('Data received from Db:\n');
      console.log(rows);
      if(rows.length > 0)
      {
        res.send("Email already exists");
      }
      else
      {
        var date = moment(req.body.dob).format('YYYY-MM-DD');
        console.log(date);
        req.body.dob = date;
        con.query("insert into patients set ?",req.body,function(err,rows){

          //if(err) throw err;
          console.log(err);
          console.log('Last insert ID:', res.insertId);
          res.send("success");
          con.end(function(err) {
            // The connection is terminated gracefully
            // Ensures all previously enqueued queries are still
            // before sending a COM_QUIT packet to the MySQL server.
          });
        });
      }
  });
});
});

app.listen(3029, function () {
  console.log('Example app listening on port 3000!')
})

