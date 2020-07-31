/**
 * This is a demo Project to prepare for the real Cuode project!
 * Author: remadisson
 * Created in, at: Bocholt, Germany - Mon, 20.07.2020
 */

const express = require('express');
const cors = require('cors');
const app = express();
const random = require('./manager/random');
const database = require('./manager/db');
const input = require('./manager/input');
const chalk = require('chalk');

//Improvement for Usage
app.use(cors()); //Makes requests available
app.use(express.json()) //Allows the use of json for communication



//Incoming requests and their treatment
app.get("/", (req, res) => {
    res.json({
        status: 400,
        message: "Bad Request",
        note: "/ is not defined for usage"
    })
})


app.post('/mobile_app/authenticate/:token', (req, res) => {
    console.log(req.params.id);
})

//Makes this whole shit available
app.listen(8000, () => {
    console.log(chalk.yellowBright("Demo-Backend Started - Wating for requests..."));
    database.init();
    input.init();
})