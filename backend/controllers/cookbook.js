const express = require("express")
const router = express.Router()
const Recipe = require("../models/recipe-model")

//home route
router.get("/",(req,res)=>{
    res.render("home")
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