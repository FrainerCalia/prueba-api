var mysql = require('mysql');

var connection   = mysql.createPool({
  connectionLimit : 10,
  host: 'b28vycrwfhpwv4w0ddvg-mysql.services.clever-cloud.com',
  user: 'u5elsmgjlbf7r6w7',
  password: 'L6cajxDZDuS77E8TLugU',
  database: 'b28vycrwfhpwv4w0ddvg'
});


connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

// connection.connect(function (err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

module.exports = {connection}
