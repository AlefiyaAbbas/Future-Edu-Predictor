const express = require("express");
const path = require('path');
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
        console.log(req.body);
        let [result,_] = await predictor.findAllColleges();
        console.log(result);
       // res.status(200).json(result);
        res.status(200).render("result", { count: result.length, result });
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


//branch ke andar min
// node js ks setup
//login