var express = require('express');
var createError = require('http-errors');
var path = require('path');
const http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); // Ensure this points to your correct route file
var loginRouter = require('./routes/loginRoute');
var relatorioRouter = require('./routes/relatorioRoute')
var studentRoutes = require('./routes/studentRoutes')
var testRouter = require('./routes/testRoute');


var app = express();

const PORT = process.env.PORT || 3000; // Port the server will listen on

const server = http.createServer(app);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Use 'ejs' if you prefer EJS, or another supported engine


app.use(logger('dev'));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter); // Make sure the indexRouter is correctly defined and points to your routes
app.use('/login', loginRouter);
app.use('/relatorio', relatorioRouter)
// app.use('/api/students', studentRoutes); 
// app.use('/api/test', testRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
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
