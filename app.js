var express = require('express');
var createError = require('http-errors');
var path = require('path');
const http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session'); // Import express-session
const {Login} = require('./models')
const {Op} = require('sequelize')

var indexRouter = require('./routes/index'); // Ensure this points to your correct route file
var loginRouter = require('./routes/loginRoute');
var relatorioRouter = require('./routes/relatorioRoute')
const studentRoutes = require('./routes/studentRoutes'); // Adjust path if needed
var authRoutes = require('./routes/authRoutes');
const checkin = require('./routes/checkRoutes')
const checkout = require('./routes/checkoutRoutes')
const dashboard = require ('./routes/dashboardRoutes')
const homeRouter = require('./routes/homeRoute')


var app = express();

const PORT = process.env.PORT || 3000; // Port the server will listen on

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true })); // To handle form data

// Minimal session setup
app.use(session({
  secret: 'myDevelopmentSecret', // You can set a temporary secret key for development
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true only if using HTTPS
}));

app.use('/students', studentRoutes);
app.use('/auth', authRoutes);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 


app.use(logger('dev'));
app.use(express.json()); // Parsing application/json
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter); 
app.use('/login', loginRouter);
app.use('/relatorio', relatorioRouter);
app.use('/', studentRoutes);
app.use('/checkin', checkin)
app.use('/checkout', checkout)

// app.get('/home', (req, res) => {
//   console.log("App data");  // Debug check
//   res.sendFile(path.join(__dirname, 'public/html', 'homeAdm.html'));
// });

app.get('/home', homeRouter);

app.get('/dashboard', dashboard)

// app.get('/dashboard', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/html', 'dashboard.html'));
// });

// app.get('/checkin', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/html', 'checkin.html'));
// });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error'); // Make sure an error view template exists
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
