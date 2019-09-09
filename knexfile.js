/*
|--------------------------------------------------------------------------
| Include dotenv plugin for get .env object
|--------------------------------------------------------------------------
|
*/
require('dotenv').config();

/*
|--------------------------------------------------------------------------
| This Object return database connection object 
|--------------------------------------------------------------------------
|
*/

module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: 'utf8'
  },
  pool: { min: 2, max: 10 },
  migrations: {
    tableName: 'migrations'
  }
};