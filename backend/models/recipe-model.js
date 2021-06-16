const mongoose = require("../db/connection")

const recipeSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
        },
        cooktime:{
            type:Number,
            required: true,
        },
        vegetarian :{
            type:Boolean,
            required:true,
        },
        vegan :{
            type:Boolean,
            required:true,
        },
        ingredients :[{
            type: String,
            required: true,
        }],
        instructions : [{
            type: String,
            required: true,
        }],       
    }
)


const Recipe = mongoose.model("Recipe",recipeSchema)
module.exports = Recipe;