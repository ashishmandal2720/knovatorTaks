require("./config/database").connect();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser')


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser())
app.use(
  session({
    secret: 'apple',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user || user.password !== password) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'apple',
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);



const userRegistration = require('./routers/userRegistrationRoutes')
app.use('/user', userRegistration);

const postsRoutes = require('./routers/postsRoutes')
app.use('/post', postsRoutes);

const locationRoutes = require('./routers/locationRoutes')
app.use('/location', locationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
