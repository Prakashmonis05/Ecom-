const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

};

// app.get("/", (req, res) => {
//     res.send("Backend is running");
// });

module.exports = connectDB;