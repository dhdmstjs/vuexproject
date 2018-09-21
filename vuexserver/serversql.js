const mysql = require('mysql');
var connection = mysql.createConnection({
host : 'vuex-project.cnluqjaqdu8c.us-east-2.rds.amazonaws.com',
user : '',
password : '',
port : '3306',
database: 'vuex-project'
});

connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
});
