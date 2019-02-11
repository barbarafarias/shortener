const db = require('../db');
const shortid = require('shortid');

const getShortenedUrl = () => {
    let hash = shortid.generate();
    return `https://links.tillhub.de/${hash}`;
}

const short = async (originalUrl) => {
    let data, res
    try {
        res = await db.getUrlByOriginalUrl(originalUrl);
        if (res.rowCount > 0) {
            data = res.rows[0];
        } else {
            let shortenedUrl = getShortenedUrl();
            res = await db.getUrlByShortenedUrl(shortenedUrl);
            while (res.rowCount > 0) {
                shortenedUrl = getShortenedUrl();
                res = await db.getUrlByShortenedUrl(shortenedUrl);
            }
            res = await db.insertUrl(originalUrl, shortenedUrl);
            data = res.rows[0];    
        }
        
    } catch(err) {
        console.log(err)
        throw err;
    }
    return data;
  }
  
module.exports = {
    short
}
  