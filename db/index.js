const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const getUrlByOriginalUrl = async (originalUrl) => {
    return await pool.query('SELECT * FROM urls WHERE ORIGINAL_URL = $1', [originalUrl]);
}

const getUrlByShortenedUrl = async (shortenedUrl) => {
    return await pool.query('SELECT * FROM urls WHERE SHORTENED_URL = $1', [shortenedUrl]);
}

const insertUrl = async (originalUrl, shortenedUrl) => {
    return await pool.query('INSERT INTO urls(ORIGINAL_URL, SHORTENED_URL) VALUES($1, $2) RETURNING *', [originalUrl, shortenedUrl]); 
}

module.exports = {
    getUrlByOriginalUrl,
    getUrlByShortenedUrl,
    insertUrl,
}