let mysql = require('mysql');
let connection = mysql.createPool({
  host: "123.net",
  user: "123",
  password: "123",
  database: "123",
  multipleStatements: true
});
connection.getConnection(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


module.exports = connection;
