const express = require('express'); //importing express
const bodyParser = require('body-parser'); //import bp
const exphbs = require('express-handlebars'); //reference express-hbs after download

const townRegNumbers = require('./regNumbers');
const routes = require('./route');
const app = express(); //instance of app

const flash = require('express-flash');
const session = require('express-session');


const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost/my_reg_numbers';


const pool = new Pool({
    connectionString

});

const townApp = townRegNumbers(pool);
const myRoutes = routes(townApp);


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars'); //configure handlebars

app.use(session({
    secret: "enter here",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json()); //config as per line13

app.use(express.static('public'));

app.get('/', myRoutes.enteredNumbers);
app.post('/reg_numbers', myRoutes.add);
app.post('/filter_plate', myRoutes.filtersApp);

// app.post('/greet', myRoutes.theList);

// app.get('/counter', myRoutes.greetedNames);

// app.get('/reset', myRoutes.resetsApp);


const PORT = process.env.PORT || 3001; //config port to use default and define new port
app.listen(PORT, function () {
    console.log("App listening at port:", PORT);
});