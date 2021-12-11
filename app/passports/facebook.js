const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const env = require('../getEnv');

passport.use(
    new Strategy(
        {
            clientID: env.FACEBOOK_CLIENT_ID,
            clientSecret: env.FACEBOOK_CLIENT_SECRET,
            callbackURL: `https://${env.SERVER_HOST_NAME}/auth/login/facebook/callback`,
            profileFields: ['id', 'emails', 'name', 'displayName'],
            state: true,
        },
        (accessToken, refreshToken, profile, cb) => cb(null, profile),
    ),
);
