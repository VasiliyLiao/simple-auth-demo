const passport = require('passport');

require('./local');
require('./facebook');
require('./google');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
