const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/food-del");
        console.log("DB Connected Successfully!");
    } catch (err) {
        console.error(err.message);
    }
}
module.exports = { connectDB };
