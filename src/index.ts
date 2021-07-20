import express from 'express'
const app: express.Express = express()

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
app.get('/', (req, res) => {
  res.send('Hello World 3');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
