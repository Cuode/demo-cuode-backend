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

//Improvement for Usage
app.use(cors()); //Makes requests available
app.use(express.json()) //Allow the use of json for communication


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
    console.log("Demo-Backend Started - Wating for requests...");
    database.init();
})