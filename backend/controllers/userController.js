const { UserModel } = require('../models/UserModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const validator = require("validator")


const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email ||
            !password) {
            return res.json({ success: false, message: "Enter Required Details" })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User Not Exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Enter Valid Credentials" })
        }

        const token = await handleSetToken(user._id)

        return res.json({ success: true, message: "User Login Successful", token : token})
    } catch (error) {
        console.log(error)
        return res.json({success : false, message : error})
    }


}

const handleSetToken = async (id) => {
    const secretKey = process.env.JWT_SECRET;

    return jwt.sign({ id }, secretKey);
}

const handleRegister = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName ||
            !email ||
            !password
        ) {
            return res.status(402).json({ success: false, message: "Enter Required Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter Valid Email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter Strong Password" })
        }

        const exists = await UserModel.findOne({ email })

        if (exists) {
            return res.json({ success: false, message: "Email Already Exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({
            fullName,
            email,
            password: hashedPassword
        })

        const token = await handleSetToken(newUser._id)
        return res.json({ success: true, message : "Account Registered", token : token})


    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error })
    }
}

module.exports = {
    handleLogin,
    handleRegister
}