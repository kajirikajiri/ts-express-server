module.exports = {
  type: "mysql",
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  connectTimeout: 100000,

  // https://docs.nestjs.com/techniques/database#:~:text=export%20class%20AppModule%20%7B%7D-,WARNING,-Setting%20synchronize%3A%20true
  // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  synchronize: process.env.NODE_ENV == 'development' ? true : false,

  logging: false,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations"
  }
}