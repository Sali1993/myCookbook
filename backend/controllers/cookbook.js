const express = require("express")
const router = express.Router()
const passport = require("passport")
const dotenv = require("dotenv")
const util = require('util')
const url = require('url')
const querystring = require('querystring')

dotenv.config()

const Recipe = require("../models/recipe-model")

//login

router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
}), (req, res) => {
    res.redirect('/landing');
})

router.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.redirect('/login') }
        req.logIn(user, function (err) {
            if (err) { return next(err) }
            const returnTo = req.session.returnTo
            delete req.session.returnTo
            res.redirect(returnTo || '/landing')
        })
    })(req, res, next)
});


//logout

router.get('/logout', (req, res) => {
    req.logout();

    var returnTo = req.protocol + '://' + req.hostname;
    var port = req.socket.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo += ':' + port;
    }
    var logoutURL = new url.URL(
        util.format('https://%s/v2/logout', process.env.ISSUER_BASE_URL)
    );
    var searchString = querystring.stringify({
        client_id: process.env.CLIENT_ID,
        returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
});



//home route

router.get("/",(req,res)=>{
    res.render("home")
    // res.send(req.oidc.isAuthenticated()? "logged in": "logged out")
})

router.get("/landing", (req, res) => {
    res.render("landing")
  
})


//index route
router.get("/recipes/", (req, res) => {
Recipe.find({})
        .then(recipes =>{
        //    res.send(recipes) 
            res.render("recipes",{recipes})
        })
})




//new route
router.get("/recipes/new",(req,res)=>{
    res.render("new")
})


//create route
router.post("/recipes/",(req,res)=>{
    console.log(req.body)
    Recipe.create(
        {
            title: req.body.title,
            cooktime: req.body.cooktime,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            vegetarian: req.body.vegetarian=="on",
            vegan: req.body.vegan=="on"

        }
    )
            .then(recipe =>{
              
                res.render("detail",recipe)
            })
             .catch(err => {
                 console.log(err)
                 res.send("recipe not added")
        })
})



//delete route
router.delete("/recipes/:id/", (req, res) => {
    const id = req.params.id
    Recipe.findOneAndDelete(
        { _id: id }
    )
        .then(result => {
            res.redirect("/recipes")
        })
})





//edit route
router.get("/recipes/:id/edit", (req, res) => {
    console.log("on edit route")
    const id = req.params.id
    Recipe.findById(id)
            .then(recipe =>{
                console.log(recipe)
                res.render("edit", recipe)
            })
             .catch(err => {
                 console.log(err)
                res.send("edit unsuccessful")
         })

    

})

router.put("/recipes/:id/", (req, res) => {
    const id = req.params.id
    Recipe.findOneAndUpdate(
        { _id: id },
        {
            title: req.body.title,
            cooktime: req.body.cooktime,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            vegetarian: req.body.vegetarian=="on",
            vegan: req.body.vegan=="on"
           
        },
        { new: true },
    )
        .then(recipe => {
            console.log(req.body.title)
            res.render("detail", recipe)
        })
        .catch(console.log)
})


//detail route
router.get("/recipes/:id", (req, res) => {
    const routeId = req.params.id
    Recipe.findById(routeId)
        .then(recipe => {
            res.render("detail", recipe)
        })

})




module.exports = router