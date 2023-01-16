var express = require("express")
var app = express()
var db = require("./database.js")
var cron = require('node-cron');
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { check, validationResult } = require("express-validator");
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: '*'
}));


let HTTP_PORT = 8080
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/api/customer", (req, res, next) => {
    try {
        var sql = "select * from customer"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }

});

app.get("/api/customer/:id", (req, res, next) => {
    try {
        var sql = "select * from customer where customerId = ?"
        var params = [req.params.id]
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.post("/api/customer", 

    [check("email").isEmail().withMessage("Invalid email address"),
    check("cardNumber").isNumeric().isLength({ min: 12, max: 12 }).withMessage("Invalid credit card number")], (req, res, next) => {
    
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name,
                address,
                email,
                dateOfBirth,
                gender, 
                age, 
                cardHolderName, 
                cardNumber, 
                expireDate, 
                cvv, 
                CURRENT_TIMESTAMP 
            } = req.body;

        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expireDate, cvv, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)'
        var data = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expireDate, cvv]
        db.run(sql, data, function (err, _result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "message": `customer ${name} has registered`,
                    "customerId": this.lastID
                })
            }
        });
    } catch (E) {
        res.status(400).send(E);
    }
});



app.put("/api/customer/:id", (req, res, next) => {

    const { name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expireDate,
            cvv,
            timeStamp 
    } = req.body;

    db.run(`UPDATE customer set name = ?, address = ?, email = ?, dateOfBirth = ?, gender=?, age=?, cardHolderName=?, cardNumber=?, expireDate=?, cvv=?, timeStamp=? WHERE customerId = ?`, 
    [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expireDate, cvv, timeStamp, req.params.id], 
    function (err, result) {
        if (err) {
            res.status(400).json({ message: 'Bad Request', error: err });
        } else {
            res.status(201).json({ message: `customer ${name} has been updated` });
        }
    });
});

app.delete("/api/customer/:id", (req, res, next) => {
    db.run(`DELETE FROM customer WHERE customerId = ?`, 
    [req.params.id],
    function (err, result) {
        if (err) {
            res.status(400).json({ message: 'Bad Request', error: err });
        } else {
            res.status(201).json({ message: `customer id ${req.params.id} has been deleted` });
        }
    });
});

app.delete("/api/customer/deleteAll/:id", (req, res, next) => {
    try {
        db.run(
            'DELETE FROM customer WHERE id > ?',
            req.params.id,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", rows: this.changes })
            });
    } catch (E) {
        res.status(400).send(E);
    }
});

// Root path
app.get("/", (req, res, next) => {
    res.json({ "message": "University of Moratuwa" })
});


