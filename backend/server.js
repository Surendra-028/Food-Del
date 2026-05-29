require('dotenv').config();
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/db')
const { foodRoute } = require('./routes/FoodRouter')
const { UserRouter } = require('./routes/UserRouter')
const { cartRouter } = require('./routes/CartRouter')
const { OrderRouter } = require('./routes/OrderRouter')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())

connectDB();

app.use("/api/food", foodRoute)
app.use("/images", express.static("uploads"))
app.use("/api/user", UserRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", OrderRouter)

app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(PORT, () => {
    console.log("server started")
})