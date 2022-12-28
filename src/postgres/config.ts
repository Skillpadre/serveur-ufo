require('dotenv').config({path: './.env'});

const Pool = require('pg').Pool
const Client = require('pg').Client
// DEV Localhost connection
// const pool = new Pool({
//   user: 'kinay',
//   host: 'localhost',
//   database: 'ufo_db',
//   password: 'pass',
//   port: 5432,
// })

// TEST
const pool = new Pool({
  user: process.env.PGSQL_USER,
  host: process.env.PGSQL_HOST,
  database: process.env.PGSQL_DB,
  password: process.env.PGSQL_PASSWORD,
  port: process.env.PGSQL_PORT,
})

export { pool }
// kinay
// TbpoPSQLDBi13