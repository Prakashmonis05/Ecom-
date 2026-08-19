const express = require("express");
const router = express.Router();
const {createOrder,getMyOrders,getOrderById,cancelOrder } = require("../controllers/orderController");
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
router.get(
    "/orders/:id",
    protect,
    getOrderById
)
router.put(
    "/orders/:id/cancel",
    protect,
    cancelOrder
)
module.exports = router;