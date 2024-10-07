//  import our dependencies
const express = require("express")
const app = express()
const mysql = require('mysql2');
const dotenv =require('dotenv')

// cors and ejs

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // connection is not successful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }

    // connection is successful
    console.log("Successfully connected to MySQL: ", db.threadId)
})



// this is not important for the assignmeent
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



//1. retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, data) => {
        // if I have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    })
})


// 2. retrieve all providers
app.get('', (req, res) => {
    const getProviders = "SELECT * FROM providers"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }

        res.status(200).send(data)
    })
})


// 3. Filter patients by First Name
app.get('', (req, res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    })
})


// 4. Retrieve all providers by their specialty
app.get('/providers/specialty', (req, res) => {
    const getProviders = "SELECT * FROM providers"; // Adjust columns as needed
    db.query(getProviders, (err, data) => {
        if (err) {
            console.error("Failed to get providers:", err);
            return res.status(400).json({ message: "Failed to get providers", error: err });
        }

        res.status(200).json(data); // Use .json() to send data as JSON
    });
});


// start and listen to the server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
})