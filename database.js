const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const fs = require('fs');
const initSql = fs.readFileSync('./init_db.sql', 'utf8');

db.serialize(() => {
    db.exec(initSql);
});

module.exports = db;
