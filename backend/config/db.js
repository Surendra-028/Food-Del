const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://surendra28:<db_password>@ac-gli8oij-shard-00-00.ylusrhk.mongodb.net:27017,ac-gli8oij-shard-00-01.ylusrhk.mongodb.net:27017,ac-gli8oij-shard-00-02.ylusrhk.mongodb.net:27017/?ssl=true&replicaSet=atlas-119nl0-shard-0&authSource=admin");
        console.log("DB Connected Successfully!");
    } catch (err) {
        console.error(err.message);
    }
}
module.exports = { connectDB };
