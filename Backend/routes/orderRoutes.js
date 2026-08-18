const express = require("express");
const router = express.Router();
const {createOrder,getMyOrders } = require("../controllers/orderController");
const {protect} = require("../middleware/authMiddleware");

router.post(
    "/orders",
    protect,
    createOrder
);

router.get(
    "/orders",
    protect,
    getMyOrders
)

module.exports = router;