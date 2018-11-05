'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const ShoeServices = require('./services/shoes-services');
const ShoeRoutes = require('./routes/shoe-routes');
const session = require('express-session');
const flash = require('express-flash');
const pg = require('pg');
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/shoes_db';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const shoeServices = ShoeServices(pool);
const shoeRoutes = ShoeRoutes(shoeServices);

let app = express();

app.use(session({
    secret: 'we deal with shoes',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

// route
app.get('/');
app.get('/api/shoes');
app.get('/api/shoes/brand/:brandname');
app.get('/api/shoes/size/:size');
app.get('/api/shoes/brand/:brandname/size/:size');
app.post('/api/shoes/sold/:id');
app.post('/api/shoes');

// port set-up
let PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
