const shortid = require('shortid');
const { Pool } = require('pg');

const connectionString = 'postgres://shortenerapp:shortener@localhost/shortenerapp'

const short = async (originalUrl) => {
    let pool = new Pool({
        connectionString: connectionString,
    });

    let hash = shortid.generate();
    let shortenedUrl = `https://links.tillhub.de/${hash}`;
    let data, res
    try {
        res = await pool.query('SELECT * FROM urls WHERE ORIGINAL_URL = $1', [originalUrl]);
        if (res.rowCount > 0) {
            data = res.rows[0];
        } else {
            res = await pool.query('INSERT INTO urls(ORIGINAL_URL, SHORTENED_URL) VALUES($1, $2) RETURNING *', [originalUrl, shortenedUrl]); 
            data = res.rows[0];    
        }
        
    } catch(err) {
        console.log(err)
        throw err;
    } finally {
        pool.end();
    }
    return data;
  }
  
module.exports = {
    short
}
  