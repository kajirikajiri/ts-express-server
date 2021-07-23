module.exports = {
  "type": "mysql",
  "host": process.env.HOST,
  "port": process.env.PORT,
  "username": process.env.USER,
  "password": process.env.PASS,
  "database": process.env.DATABASE,
  "synchronize": false,
  "logging": false,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}