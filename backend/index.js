const express = require("express")
const cookbookController= require("./controllers/cookbook")
const methodOverride = require("method-override")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const passport = require("passport")
const Auth0Strategy = require('passport-auth0')
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
            process.env.AUTH0_CALLBACK_URL || 'http://localhost:1200/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile)
    }
)
const session = require("express-session")
const sess = {
    secret: 'Hawks in 7',
    cookie: {},
    resave: false,
    saveUninitialized: true
}
const userInViews = require('./controllers/middleware/userInViews');
const authRouter = require('./controllers/auth');
const usersRouter = require('./controllers/users');




if (app.get('env') === 'production') {
   sess.cookie.secure = true;
    // app.set('trust proxy', 1);
}


passport.use(strategy);
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


app.use(passport.initialize())
app.use(passport.session())
app.use(session(sess))
app.use(userInViews());
app.use('/', authRouter)
//authentication for the hbs
app.use((req, res, next) => {
    res.locals.isAutheticated = req.isAuthenticated()
    next()
})
// app.use('/', usersRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs")
app.set("views", `${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))
app.use(methodOverride("_method"))
app.use(cookbookController)
app.set("port", process.env.PORT || 1200 )



app.listen(app.get("port"),()=> {console.log(`working on port ${app.get("port")}`)})