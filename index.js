const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const  { connection }  = require('./database/config');

app.use(bodyParser.json());

//app.use( cors() );
const PORT = 3000;


app.get('/customers', (req, res) => {
    const sql = 'SELECT * FROM bodega';
  
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('Not result');
      }
    });
  });

app.use(require("./routers/routers"));


app.listen(PORT, () => {
    console.log(`server runnig on port ${PORT}`);
});