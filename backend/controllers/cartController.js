const { UserModel } = require('../models/UserModel');

const addToCart = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.UserId })
        if (!user) return res.json({ success: false, message: "User not found" });

        let currentCart = user.CartItems || {};
        const food_id = req.body.item_id;

        if (!currentCart[food_id]) {
            currentCart[food_id] = 1;
        } else {
            currentCart[food_id] += 1;
        }

        await UserModel.findByIdAndUpdate(req.UserId, { CartItems: currentCart })
        return res.json({ success: true, message: "Item Added", CartItems: currentCart })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const food_id = req.body.item_id;
        const user = await UserModel.findOne({ _id: req.UserId })
        if (!user) return res.json({ success: false, message: "User not found" });

        let currentCart = user.CartItems || {};
        if (currentCart[food_id]) {
            currentCart[food_id] -= 1;
            if (currentCart[food_id] <= 0) {
                delete currentCart[food_id];
            }
        }

        await UserModel.findByIdAndUpdate(req.UserId, { CartItems: currentCart })
        return res.json({ success: true, message: "Item Removed", CartItems: currentCart })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

const getCart = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.UserId })
        if (!user) return res.json({ success: false, message: "User not found" });

        let currentCart = user.CartItems || {};
        return res.json({ success: true, CartItems: currentCart })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

module.exports = { addToCart, removeFromCart, getCart }