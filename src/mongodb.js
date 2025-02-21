const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connection successful");
})
.catch((error) => {
    console.log("MongoDB Connection failed:", error.message);
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.models.Collection1 || mongoose.model("Collection1", LoginSchema)

module.exports = { collection }