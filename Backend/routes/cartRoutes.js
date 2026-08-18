const express = require("express");

const router = express.Router();

const { addToCart ,getCart, updateCartItem, removeFromCart} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post(
    "/cart",
    protect,
    addToCart
);

router.get(
    "/cart",
    protect,
    getCart
);

router.put(
    "/cart/:productId",
    protect,
    updateCartItem
);

router.delete(
    "/cart/:productId",
    protect,
    removeFromCart
);
module.exports = router;