import "reflect-metadata";
import * as express from 'express'

const app: express.Express = express()

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
app.get('/', (_, res) => {
  res.send('/')
});

app.get('/health', (_, res) => {
  res.send('d(^_^)')
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);