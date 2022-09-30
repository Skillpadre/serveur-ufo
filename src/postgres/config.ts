const Pool = require('pg').Pool
const pool = new Pool({
  user: 'kinay',
  host: 'localhost',
  database: 'ufo_db',
  password: 'pass',
  port: 5432,
})

export { pool }