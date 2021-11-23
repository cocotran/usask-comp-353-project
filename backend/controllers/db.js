const mysql = require('mysql');

const Config = Object.freeze({
    host     : 'localhost',
    user     : 'admin',
    password : 'admin',
    database : 'project'
})

let db;  

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(Config);

        db.connect((err) => {
            if (!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
}

async function makeQuery(sql, values) {
    let result;
    db.query(sql, values, (error, results, fields) => {
        if (error) console.log(error);
        else {

        }
    });
    return results;
  }

export default { 
    connectDatabase,
    makeQuery
};