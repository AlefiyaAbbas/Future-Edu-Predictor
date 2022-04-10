const express = require("express");
const path = require('path');
const mysql = require('mysql2');
const { resourceLimits } = require("worker_threads");
const predictor = require("./models/predictor");

//const bodyParser = require("body-parser"); No Longer Requierd
require("dotenv").config();

// Decalring App
const app = express();
const port = process.env.PORT || 3000;
// console.log(process.env.DB_P);
app.set("view engine", "ejs");

// For parsing url body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Home Func (index)
app.get("/", (req, res) => {
    try {
        res.status(200).render('index');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// About
app.get("/about", (req, res) => {
    try {
        res.status(200).render('about');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// Comps
app.get("/comps", (req, res) => {
    try {
        res.status(200).render('comps');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// IT
app.get("/it", (req, res) => {
    try {
        res.status(200).render('it');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// Extc
app.get("/extc", (req, res) => {
    try {
        res.status(200).render('extc');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// AI
app.get("/AI", (req, res) => {
    try {
        res.status(200).render('AI');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// Civil
app.get("/civil", (req, res) => {
    try {
        res.status(200).render('civil');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// Electronics
app.get("/electronics", (req, res) => {
    try {
        res.status(200).render('electronics');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// contactus
app.get("/contactus", (req, res) => {
    try {
        res.status(200).render('contactus');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// Login
app.get("/login", (req, res) => {
    try {
        res.status(200).render('login');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// Predictor
app.get("/predictor", (req, res) => {
    try {
        res.status(200).render('predictor');
    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});

// Result
app.post("/result", async (req, res) => {
    try {

        let {
            first_name,
            last_name,
            status,
            email,
            phone,
            branch,
            minority,
            ssc_marks,
            hsc_marks,
            cet_marks
        } = req.body;
        branch = typeof branch !== 'undefined' ? branch : 'NULL';
        minority = typeof minority !== 'undefined' ? minority : 'NULL';
        console.log(branch);

        let [result, _] = await predictor.Colleges(minority, branch, cet_marks);
        console.log(result);
        // res.status(200).json(result);
        res.status(200).render("result", { count: result.length, result });

        //let [result, _] = await predictor.findAllColleges(cet_marks);

    } catch (error) {
        console.log(error);
        res.status(404).render('404');
    }
});


// 404
app.use((req, res) => {
    res.status(404).render('404');
})

// Listen on Environment Port or 3000
app.listen(port, () => console.log(`Listening on port ${port}`));