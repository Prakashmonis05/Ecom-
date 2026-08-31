const express = require("express");

const router = express.Router();

const {
    getDashboardStats,getLowStockProducts,getAllUsers
} = require("../controllers/adminController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

router.get(
    "/admin/dashboard",
    protect,
    adminOnly,
    getDashboardStats
);

router.get(
    "/admin/products/low-stock",
    protect,
    adminOnly,
    getLowStockProducts
);

router.get(
    "/admin/users",
    protect,
    adminOnly,
    getAllUsers
);

module.exports = router;