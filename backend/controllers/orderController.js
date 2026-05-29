const { OrderModel } = require('../models/OrderModel')
const { restrictToLoginUserOnly } = require('../middlewares/auth')
const Stripe = require('stripe');
const { UserModel } = require('../models/UserModel');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {

    const frontend_url = "https://food-del-frontend-ul5x.onrender.com/"

    try {
        const newOrder = await OrderModel.create({
            UserId: req.UserId,
            items: req.body.items,
            Address: req.body.Address,
            amount: req.body.amount
        })

        await UserModel.findByIdAndUpdate(req.UserId, { CartItems: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                unit_amount: 100 * 80 * 2,
                product_data: {
                    name: "Delivery Charges"
                }
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        return res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

const verifyOrder = async (req, res) => {
    const { success, orderId } = req.body;

    try {
        if (success === "true" || success === true) {
            await OrderModel.findByIdAndUpdate(orderId, { payment: true })
            return res.json({ success: true, message: "Paid" })
        } else {
            return res.json({ success: false, message: "Payment failed or cancelled" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Verification error" })
    }
}

const getOrders = async (req, res) => {
    try {
        const data = await OrderModel.find({ UserId: req.UserId })
        return res.json({ success: true, message: "Data Fetched", data: data })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const data = await OrderModel.find({})
        return res.json({ success: true, data: data })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await OrderModel.findByIdAndUpdate(orderId, { status: status })
        return res.json({success : true, message : "Order Status Changed"})
    } catch (error) {
        console.log(error)
        return res.json({success : false, message : error})
    }
}


module.exports = {
    placeOrder,
    verifyOrder,
    getOrders,
    getAllOrders,
    updateStatus
}
