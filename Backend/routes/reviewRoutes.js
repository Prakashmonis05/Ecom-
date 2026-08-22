const express = require("express");

const router = express.Router();

const {
    createReview,getProductReviews} = require("../controllers/reviewController");

const {
    protect
} = require("../middleware/authMiddleware");

router.post(
    "/reviews",
    protect,
    createReview
);
router.get(
    "/products/:id/reviews",
    getProductReviews
);
module.exports = router;