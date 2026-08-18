require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes=require("./routes/orderRoutes")
const User = require("./models/User");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(productRoutes);
app.use(categoryRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});







