const {Pool} = require('pg');

const env = require("dotenv");

env.config();

// Connect with a connection pool
const pool = new Pool();

module.exports = pool;