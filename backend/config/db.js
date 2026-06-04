const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // This dynamically pulls the clean Railway URL you paste into Render
        const directURI = process.env.MONGODB_URI;

        if (!directURI) {
            throw new Error("MONGODB_URI environment variable is missing!");
        }

        await mongoose.connect(directURI);
        console.log("DB Connected Successfully!!!");
    } catch (error) {
        console.error("Connection Error:", error.message);
        process.exit(1); // Safely shuts down the process if connection fails
    }
}

module.exports = { connectDB };
