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
  user: 'kinay',
  host: 'ac489625-001.eu.clouddb.ovh.net',
  database: 'ufo_db',
  password: 'TbpoPSQLDBi13',
  port: 35722,
})

export { pool }
// kinay
// TbpoPSQLDBi13