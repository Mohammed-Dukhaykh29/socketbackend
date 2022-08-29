const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://MoDuGh28:v0XYg4bkMOXQy6zc@cluster0.aabjx.mongodb.net/socketDatabase", (err, db) => {
    console.log("Database connected");
});