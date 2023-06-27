const passport = require('passport');
// const User=require('../models/User');
const User = require("./models/User")


const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const GOOGLE_CLIENT_ID = "824861024134-7qduaccacl7hcjlhgmvk8gi10sokck5b.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const GITHUB_CLIENT_ID = "477d4f27d746443e20e4"
const GITHUB_CLIENT_SECRET = "25257ff9d62d8243f9e444f089064d91dbb9b76f"

const FACEBOOK_APP_ID = "824861024134-2b5lj2244p6uf6amoi4asvi0i7gpnb10.apps.googleusercontent.com"
const FACEBOOK_APP_SECRET = "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"

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",
  dbURI: 'MONGO_URL=mongodb+srv://prasamsa:prasamsa123@cluster0.3dlz21e.mongodb.net/',
},
  function (accessToken, refreshToken, profile, done) {
    // console.log(profile)
    // console.log(_id)
    User.findOne({ username: profile.displayName }).then((currentuser) => {
      if (currentuser) {
        console.log('user is' + currentuser);
        done(null, profile)
      }

      else {

        new User({
          // _id:profile.id,
          username: profile.displayName,
        }).save().then((newUser) => {
          console.log('new user created' + newUser)
        })
        done(null, profile)
      }

    })



  }
));

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      console.log(accessToken)
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      console.log(accessToken)

    }
  )
);

