const express = require("express");
const router = express.Router();
const {createOrder,getMyOrders,getOrderById,cancelOrder,getAllOrders ,getAdminOrderById,updateOrderStatus} = require("../controllers/orderController");
const {protect, adminOnly} = require("../middleware/authMiddleware");

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

router.get(
    "/admin/orders",
    protect,
    adminOnly,
    getAllOrders
)

router.get(
    "/admin/orders/:id",
    protect,
    adminOnly,
    getAdminOrderById
)

router.put(
    "/admin/orders/:id/status",
    protect,
    adminOnly,
    updateOrderStatus
);

module.exports = router;