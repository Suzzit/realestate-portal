const { Client } = require('pg');
const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'realestate',
  password: 'root',
  port: 5432,
})

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'realestate',
  password: 'root',
  port: 5432,
})

exports.client = client
exports.pool = pool
