const passport = require('passport');
const User = require('../models/user');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '716077777121-fpm414o8122h00i4fpodconigvdgkbkj.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, next) => {
      console.log('MY PROFILE', profile);
      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log('User already exists in DB', user);
          next(null, user);
          // * cookietoken()
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
          })
            .then((user) => {
              console.log('New User', user);
              next(null, user);
            })
            .catch((err) => console.log(err));
        }
      });
      // next();
    }
  )
);
