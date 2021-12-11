const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const HttpErrors = require('http-errors');
const path = require('path');
const passport = require('passport');
const uuid = require('uuid').v4;
const env = require('./getEnv');
const app = express();

// init passports
require('./passports');

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json({
    extended: true,
}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'asdmxm',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

// passport add into middleware
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    const msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', require('./routes'));

// not found
app.use((req, res, next) => {
    next(new HttpErrors.NotFound('The Uri Not Found.'));
});

// error handles
app.use((err, req, res, next) => {
    const { code, status = 500 } = err;
    const errorCode = ((code > 200 && code <= 511) ? code : status);

    err.id = uuid();
    err.status = status;
    err.errorCode = errorCode;

    next(err);
});

app.use((err, req, res, next) => {
    const { code, status = 500 } = err;
    const errorCode = ((code > 200 && code <= 511) ? code : status);

    err.id = uuid();
    err.status = status;
    err.errorCode = errorCode;

    next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const {
        status,
        id,
        errorCode,
        message,
        stack,
        info,
        ...other
    } = err;

    const response = {
        error: {
            id,
            code: errorCode,
            message,
        },
        version: env.VERSION,
    };

    if (info) {
        response.error.info = info;
    }

    if (String(env.NODE_ENV).toLowerCase() == 'development') {
        response.error.debug = {
            stacks: stack.split('\n'),
            request: {
                method: req.method,
                url: req.url,
                headers: req.headers,
                body: req.body,
            },
            ...other,
        };
    }

    res.status(status).json(response);
});

module.exports = app;
