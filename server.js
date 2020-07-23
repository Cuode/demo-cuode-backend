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
database.init();
input.init(); //Registers local input listener


//Incoming requests and their treatment
app.get("/", (req, res) => {
    res.json({
        status: 400,
        message: "Bad Request",
        note: "/ is not defined for usage"
    })
})


//Makes this whole shit available
app.listen(7810, () => {
    console.log(chalk.yellowBright("Demo-Backend Started - Wating for requests..."));
})