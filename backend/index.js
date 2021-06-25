const express = require("express")
const cookbookController= require("./controllers/cookbook")
const methodOverride = require("method-override")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs")
app.set("views", `${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))
app.use(methodOverride("_method"))
app.use(cookbookController)
app.set("port", process.env.PORT || 1200 )



app.listen(app.get("port"),()=> {console.log(`working on port ${app.get("port")}`)})