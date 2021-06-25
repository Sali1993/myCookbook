const mongoose = require("../db/connection")

const recipeSchema = new mongoose.Schema(
    {
        title:String,
        cooktime:Number,
        vegetarian :Boolean,
        vegan :Boolean,
        ingredients:[],
        instructions: []       
    }
)


const Recipe = mongoose.model("Recipe",recipeSchema)
module.exports = Recipe;