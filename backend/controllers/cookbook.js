const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe-model")

//home route
router.get("/",(req,res)=>{
    res.render("home")
})


//index route
router.get("/recipes", (req, res) => {
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
router.post("/recipes",(req,res)=>{
    console.log(req.body)
    Recipe.create(req.body)
            .then(res =>{
                res.send(`${result}`)
            })
             .catch(err => {
                 console.log(err)
                 res.send("recipe not added")
        })
})



//delete route



//edit route

//detail route
router.get("/recipes/:id", (req, res) => {
    const routeId = req.params.id
    Recipe.findById(routeId)
        .then(recipe => {
            res.render("detail", recipe)
        })

})


module.exports = router