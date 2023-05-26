const express = require('express');
const app = express();
const db = require('./src/db/setup_db');

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require("dotenv").config();


const port = process.env.PORT || 3301;


const buildPath = path.join(__dirname, '..', 'build/');
app.use(express.static(buildPath));

const adminRoute = require('./src/routes/admin');
const playerRoute = require('./src/routes/players');


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "https://drawesomegame.herokuapp.com/");
  // res.header("Access-Control-Allow-Origin", "http://192.168.18.12:3301");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE,OPTIONS");
  next();
});

app.use(cors());



// app.use(express.json());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));



app.use("/api/admin", adminRoute);
app.use("/api/player", playerRoute);

console.log(process.env.PORT);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  console.log(process.env.PORT);
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, '0.0.0.0', () => {
  console.log('Backend is Running');
});
