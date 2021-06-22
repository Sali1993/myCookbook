const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe-model")

router.get("/",(req,res)=>{
    res.render("home")
})

router.get("/recipes", (req, res) => {
Recipe.find({})
        .then(recipes =>{
        //    res.send(recipes) 
            res.render("recipes",{recipes})
        })
})

router.get("/recipes/:id", (req, res) => {
    const routeId = req.params.id
    Recipe.findById(routeId)
            .then(recipe =>{
                res.render("detail", recipe)
            })
           
})

router.get("/recipes/new",(req,res)=>{
    res.render('new')
})

router.post("/recipes",(req,res)=>{
    console.log(req.body)
})





module.exports = router