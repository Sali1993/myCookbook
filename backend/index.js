const express = require("express")
const cookbookController= require("./controllers/cookbook")

const app = express()
app.use(express.json())
app.set("view engine", "hbs")
app.set("views", `${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))
app.set("port", process.env.PORT || 1200 )

app.use(cookbookController)

app.listen(app.get("port"),()=> {console.log(`working on port ${app.get("port")}`)})