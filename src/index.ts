import "reflect-metadata";
import * as express from 'express'
import {createConnection} from "typeorm";
import {User} from "./entity/User";

const connection = createConnection({
  type: "mysql",
  host: "mysql",
  port: 3306,
  username: "root",
  password: "admin",
  database: "test",
  entities: [
      User
  ],
  synchronize: true,
  logging: false
})

const app: express.Express = express()

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
app.get('/', (req, res) => {
  connection.then(connection=>{
    const user = new User()
    user.firstName = 'tarou'
    user.lastName = 'satou'
    user.isActive = true
    return connection.manager.save(user).then(user => {
      console.log(`userId: ${user.id}`)
    })
  }).catch(err => console.log(err))
  res.send('Hello World 3');
});

app.get('/get', (req, res) => {
  connection.then(async connection => {
    const userRepository = connection.getRepository(User)
    const all = await userRepository.find()
    console.log(all)
    const one = await userRepository.findOne(1)
    console.log(one)
  })
  res.send('hello hello')
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);