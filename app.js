//npx nodemon -e js,ejs,sql,env app.js
//npm run start
//npm run devstart

// set up the server
const express = require("express");
const logger = require("morgan");
const app = express()
const port = 3031;
const DEBUG = true;
const db = require("./db/db_connection");

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

app.use(logger("dev"));
app.use(express.static(__dirname+'/public'));



// start the server
app.listen(port, () => {
    console.log(`App server listening on ${port}`);
})

const query_select_symptom = `SELECT * FROM symptoms`;

app.get('/intro/riskconditions/confirmrisk/symptoms', (req, res, next) => {
    db.query(query_select_symptom, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);

        if (error)
            res.status(500).send(error);
        else if (results.length == 0)
            res.status(404).send(`No symptom found with id = "${1}"`);
        else {
            let data = { symptoms: results }; // Pass all the symptoms as an array
            res.render('symptoms', data);
        }
    });
});

// define a route for the default home page
app.get("/", (req, res) => {
    res.render('index');
});
app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/abstract",(req,res)=>{
    res.render("abstract");
});

app.get("/credits",(req,res)=>{
    res.render("credits");
});

app.get("/ourteam",(req,res)=>{
    res.render("ourteam");
});

app.get("/intro",(req,res)=>{
    res.render("intro");
});

const query_select_riskfactors = `SELECT * FROM risk_factors`;

app.get('/intro/riskconditions', (req, res, next) => {
    db.query(query_select_riskfactors, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);

        if (error)
            res.status(500).send(error);
        else if (results.length == 0)
            res.status(404).send(`No risk factor found with id = "${1}"`);
        else {
            let data = { risk_factor: results }; 
            res.render('riskconditions', data);
        }
    });
});


app.get("/intro/riskconditions/confirmrisk",(req,res)=>{
    res.render("confirmrisk");
});


app.get("/intro/riskconditions/confirmrisk/symptoms/confirmsymptoms", (req, res) => {
    res.render("confirmsymptoms");
});


app.get("/intro/riskconditions/confirmrisk/symptoms/confirmsymptoms/results",(req,res)=>{
    res.render("results");
});



const database_detail_sql = `
    SELECT * from patient
`


app.get('/database', (req, res, next) => {
    db.query(database_detail_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);

        if (error)
            res.status(500).send(error);
        else if (results.length == 0)
            res.status(404).send(`No patient found with id = "${1}"`);
        else {
            let data = { patient: results }; 
            res.render('database', data);
        }
    });
});

app.get('/database/details', (req, res, next) => {
    db.query(database_detail_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);

        if (error)
            res.status(500).send(error);
        else if (results.length == 0)
            res.status(404).send(`No patient found with id = "${1}"`);
        else {
            let data = { patient: results }; 
            res.render('details', data);
        }
    });
});
