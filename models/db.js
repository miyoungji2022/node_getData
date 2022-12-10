const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

const conn = mysql.createConnection({
    host:dbConfig.host,
    user:dbConfig.user,
    password:dbConfig.password,
    database:dbConfig.db
});

conn.connect(error => {
    if(error) {
        console.log('연결 에러 발생 ' + error);
    } else {
        console.log(`성공적으로 ${dbConfig.db}에 연결하였습니다.`);
    }
})


module.exports = conn;
