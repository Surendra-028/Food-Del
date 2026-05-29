const express = require('express')
const { restrictToLoginUserOnly } = require('../middlewares/auth')
const { placeOrder, verifyOrder, getOrders, getAllOrders, updateStatus } = require('../controllers/orderController')
const OrderRouter = express.Router()

OrderRouter
.post("/place", restrictToLoginUserOnly, placeOrder)
.post("/verify", verifyOrder)
.get("/myorders", restrictToLoginUserOnly, getOrders)
.get("/list", getAllOrders)
.post("/status", updateStatus)


module.exports = {
    OrderRouter
}