/**
 * This is a demo Project to prepare for the real cuode project!
 * Author: remadisson
 * Bocholt, Germany - 20.07.2020
 */

const express = require('express');
const monk = require('monk');
const cors = require('cors');
const app = express();

//Registration for Databases:
const database = monk('localhost/cuode-demo');
const users = database.get('users');
const quotes = database.get('quotes');
const firstnames = database.get('firstnames');
const lastnamse = database.get('lastnames');
const sentencse = database.get('sentences');

//Improvement for Usage
app.use(cors()); //Makes requests available
app.use(express.json()) //Allow the use of json for communication


//Incoming requests and their treatment
app.get("/", (req, res) => {
    res.json({
        status: 400,
        message: "Bad Request",
        note: "/ is not defined for useage"
    })
})


//Makes this whole shit available
app.listen(7810, () => {
    console.log("Demo-Backend Started - Wating for requests...");
})