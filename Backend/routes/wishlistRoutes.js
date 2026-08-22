const express = require("express");

const router = express.Router();

const {
    toggleWishlist,getWishlist
} = require("../controllers/wishlistController");

const {
    protect
} = require("../middleware/authMiddleware");

router.post(
    "/wishlist/:productId",
    protect,
    toggleWishlist
);

router.get(
    "/wishlist",
    protect,
    getWishlist
);

module.exports = router;