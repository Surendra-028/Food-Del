const express = require('express')
const fs = require('fs')
const foodRoute = express.Router();
const multer = require('multer');
const { handleAddFood, handleGetAllFoodItems,removeFoodItem } = require('../controllers/foodController')


const storage = multer.diskStorage({
    destination : "uploads",
    filename : (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage : storage})

foodRoute
.post("/add", upload.single("image"), handleAddFood)
.get("/list", handleGetAllFoodItems)
.post("/remove", removeFoodItem)




module.exports = { foodRoute }