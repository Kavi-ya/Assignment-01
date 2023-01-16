var sqlite3 = require('sqlite3').verbose()
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const DBSOURCE = "db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE customer (
                customerId INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                dateOfBirth DATE NOT NULL,
                gender VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                cardHolderName VARCHAR(255) NOT NULL,
                cardNumber VARCHAR(255) NOT NULL,
                expireDate DATE NOT NULL,
                cvv INT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL
                CHECK (gender in ('male', 'female'))
            )`,
             (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Table created successfully");
                // Table just created, creating some rows
                var insert = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expireDate, cvv, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)'
                db.run(insert, ["Kavindu Sahan Silva", "No 324/A Ra De Mel Road, Colombo", "Iakith@gmail.com", "2004.12.25", "male", "18", "K.K.S.Silva", "102445217895", "12/2023", "578"])
            }
        })
    }
});

module.exports = db;



