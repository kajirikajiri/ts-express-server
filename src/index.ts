import express from 'express'
import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'admin',
  database: 'test'
});

connection.connect()

const app: express.Express = express()

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
app.get('/', (req, res) => {
  const sql = 'select * from user'
  connection.query(sql, (err, rows, fields)=> {
    if (err) {
      console.log(err)
      return
    }
    for (const i in rows) {
      console.log(fields)
      console.log(rows[i])
    }
  })

  res.send('Hello World 3');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
