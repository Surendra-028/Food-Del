const express = require('express')
const { foodModel } = require('../models/FoodModel')
const fs = require('fs')

async function handleAddFood(req, res) {
    try {
        const { name, description, price, category } = req.body;
        const image_filename = req.file ? req.file.filename : "";

        if (!name || !description || !price || !category || !image_filename) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newFood = await foodModel.create({
            name, 
            image: image_filename,
            description,
            price: Number(price),
            category
        })

        return res.status(201).json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

async function handleGetAllFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({})
        return res.status(200).json({ success: true, message: "All Food Items", data : foodItems })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

async function removeFoodItem(req, res) {
    try {
        if (!req.body || !req.body.id) {
            return res.status(400).json({ success: false, message: "ID field is required" });
        }

        const { id } = req.body;
        const foodItem = await foodModel.findById(id);

        if (!foodItem) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        if (foodItem.image && foodItem.image !== "default.png") {
            fs.unlink(`uploads/${foodItem.image}`, (err) => {
                if (err) console.log("File deletion error:", err);
            });
        }

        await foodModel.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = {
    handleAddFood,
    handleGetAllFoodItems,
    removeFoodItem
}