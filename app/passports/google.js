const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;
const env = require('../getEnv');

passport.use(
    new Strategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: `https://${env.SERVER_HOST_NAME}/auth/login/google/callback`,
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
            ],
            state: true,
        },
        (accessToken, refreshToken, profile, cb) => cb(null, profile),
    ),
);
