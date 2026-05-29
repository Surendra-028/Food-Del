const express = require('express')
const cartRouter = express.Router()
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController')
const { restrictToLoginUserOnly } = require('../middlewares/auth')

cartRouter
.post("/add", restrictToLoginUserOnly, addToCart)
.post("/remove", restrictToLoginUserOnly, removeFromCart)
.get("/", restrictToLoginUserOnly, getCart)

module.exports = {
    cartRouter
}