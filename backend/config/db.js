const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected Successfully!");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
    }
}

module.exports = { connectDB };