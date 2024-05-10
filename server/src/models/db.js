const mysql = require('mysql2')
 const db =  mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database:"test-react"
 })

 module.exports = db