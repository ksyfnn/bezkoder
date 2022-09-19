const mysql = require('mysql');
const dbConfig = require('../config/config');

const conn = mysql.createConnection({
    host : dbConfig.host,
    user : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.db
});

conn.connect(error => {
    if (error) throw error;
    console.log('database has been active');
});

module.exports = conn;